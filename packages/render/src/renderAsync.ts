import type {
  PipeableStream,
  ReactDOMServerReadableStream,
} from "react-dom/server";
// @ts-ignore
import cssText from "./css/index.css";

const decoder = new TextDecoder("utf-8");

function dedent(str: string) {
  return str.replace(/^\s+/gm, "");
}

const readStream = async (
  stream: PipeableStream | ReactDOMServerReadableStream
) => {
  let result = "";

  if ("pipeTo" in stream) {
    // means it's a readable stream
    const writableStream = new WritableStream({
      write(chunk: BufferSource) {
        result += decoder.decode(chunk);
      },
    });
    await stream.pipeTo(writableStream);
  } else {
    // Using an `await import` here proved to cause issues when running
    // inside of Node's VM after `esbuild` would have this compiled to CJS.
    //
    // See https://github.com/resend/react-email/blob/c56cb71ab61a718ee932048a08b65185daeeafa5/packages/react-email/src/utils/get-email-component.ts
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Writable } = require("node:stream") as typeof import("node:stream");
    const writable = new Writable({
      write(chunk: BufferSource, _encoding, callback) {
        result += decoder.decode(chunk);

        callback();
      },
    });
    stream.pipe(writable);

    return new Promise<string>((resolve, reject) => {
      writable.on("error", reject);
      writable.on("close", () => {
        resolve(result);
      });
    });
  }

  return result;
};

function decodeHtmlEntities(str: string) {
  return str.replace(/&([^;]+);/g, (match, entity) => {
    const entities: Record<string, string> = {
      'amp': '&',
      'apos': "'",
      '#x27': "'",
      'quot': '"',
      'lt': '<',
      'gt': '>'
    };
    return entities[entity] || match;
  });
}

export const renderAsync = async (
  component: React.ReactElement,
  documentCss?: string,
  headContents?: string
) => {
  const reactDOMServer = await import("react-dom/server");
  
  // Then render the main component
  let html!: string;
  if (Object.hasOwn(reactDOMServer, "renderToReadableStream")) {
    html = await readStream(
      await reactDOMServer.renderToReadableStream(component)
    );
  } else {
    await new Promise<void>((resolve, reject) => {
      const stream = reactDOMServer.renderToPipeableStream(component, {
        async onAllReady() {
          html = await readStream(stream);
          resolve();
        },
        onError(error) {
          reject(error as Error);
        },
      });
    });
  }

  let extractedHeadContents = '';
  const headMatches = html.matchAll(/<head>(.*?)<\/head>/gs);
  const seenMetaTags = new Set();
  
  for (const match of headMatches) {
    if (match[1]) {
      // Process meta tags to avoid duplicates
      const content = decodeHtmlEntities(match[1]);
      const metaMatches = content.matchAll(/<meta[^>]+>/g);
      for (const metaMatch of metaMatches) {
        const metaTag = metaMatch[0];
        if (!seenMetaTags.has(metaTag)) {
          seenMetaTags.add(metaTag);
          extractedHeadContents += metaTag;
        }
      }
      
      // Add non-meta content
      extractedHeadContents += content.replace(/<meta[^>]+>/g, '');
      
      // Remove the head section from main HTML
      html = html.replace(match[0], '');
    }
  }

  // Add onerror attribute to all <link rel="stylesheet"> tags.
  // This ensures that if a stylesheet link fails (due to an invalid URL or CORS issues),
  // it gets removed, so that the iframe content can still load.
  extractedHeadContents = extractedHeadContents.replace(
    /<link([^>]*rel=["']stylesheet["'][^>]*)>/gi,
    (match, p1) => {
      if (match.includes('onerror=')) return match;
      return `<link${p1} onerror="console.error('Failed to load stylesheet:', this.href); this.onerror=null;this.remove();">`;
    }
  );

  const document = dedent(`
      <!DOCTYPE html>
      <html>
        <head>
          <base target="_blank">
          ${documentCss ? `<style>${documentCss}</style>` : ""}
          <style>${cssText}</style>
          ${extractedHeadContents}
          <script src="https://unpkg.com/@htmldocs/render@0.1.7/dist/paged.polyfill.js"></script>
          <script type="text/javascript">
            // Hide content initially
            // document.querySelector("html").style.visibility = "hidden";
            
            const horizontalPadding = 20;
            
            const scaleToFit = () => {
              try {
                const pageElement = document.querySelector(".pagedjs_page");
                if (!pageElement) return;
                
                const pageWidth = pageElement.offsetWidth + horizontalPadding * 2;
                const scaleFactor = window.innerWidth / pageWidth;
                
                console.debug("Scale debug:", {
                  windowWidth: window.innerWidth,
                  pageWidth: pageElement.offsetWidth,
                  pageWidthWithPadding: pageWidth,
                  scaleFactor,
                  timestamp: new Date().toISOString()
                });
              } catch (err) {
                console.error("Error in scaleToFit:", err);
              }
            };
            
            // Save scroll position before unload
            window.onbeforeunload = function() {
              try {
                localStorage.setItem("scrollpos", String(window.scrollY));
              } catch (err) {
                console.error("Error saving scroll position:", err);
              }
            };
            
            // Handle window resize
            window.addEventListener("resize", scaleToFit);
            
            // Handle zoom messages from parent
            window.addEventListener("message", (event) => {
              if (event.data.type === "zoom") {
                const htmlElement = document.querySelector("html");
                if (htmlElement) {
                  htmlElement.style.zoom = event.data.level;
                  // Store zoom level in localStorage
                  localStorage.setItem("zoomLevel", event.data.level);
                }
              }
            });

            // Apply stored zoom level on load
            try {
              const storedZoom = localStorage.getItem("zoomLevel");
              if (storedZoom) {
                const htmlElement = document.querySelector("html");
                if (htmlElement) {
                  htmlElement.style.zoom = storedZoom;
                }
              }
            } catch (err) {
              console.error("Error applying stored zoom:", err);
            }
            
            // Register Paged.js handler when API is available
            if (typeof Paged !== "undefined") {
              class MyHandler extends Paged.Handler {
                afterPageLayout(pageFragment, page) {
                  try {
                    console.debug("afterPageLayout triggered");
                    scaleToFit();
                    var scrollpos = localStorage.getItem("scrollpos");
                    if (scrollpos) window.scrollTo(0, parseInt(scrollpos, 10));
                    document.querySelector("html").style.visibility = "visible";

                    // Get document size
                    const documentEl = document.getElementById('document');
                    const documentSize = documentEl?.getAttribute('data-size');
                    const documentOrientation = documentEl?.getAttribute('data-orientation');

                    // After layout, set document height to 100% so that it doesn't interfere with page chunking
                    documentEl?.style.setProperty('height', '100%');

                    // Notify parent window when layout is complete
                    window.parent.postMessage({ 
                      type: 'layoutComplete',
                      documentSize,
                      documentOrientation,
                      timestamp: new Date().toISOString()
                    }, '*');
                    console.debug("layoutComplete message sent", { documentSize });
                  } catch (err) {
                    console.error("Error in afterPageLayout:", err);
                    // Still show content even if there's an error
                    document.querySelector("html").style.visibility = "visible";
                  }
                }
              }
              Paged.registerHandlers(MyHandler);
              console.debug("Paged.js registered handlers");
            }
          </script>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `);

  return document;
};

export type RenderAsyncFunction = typeof renderAsync;