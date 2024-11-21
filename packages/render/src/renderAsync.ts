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
      const content = match[1];
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

  const document = dedent(`
      <!DOCTYPE html>
      <html>
        <head>
          ${documentCss ? `<style>${documentCss}</style>` : ""}
          <style>${cssText}</style>
          ${extractedHeadContents}
          <script src="https://unpkg.com/pagedjs@0.5.0-beta.2/dist/paged.polyfill.js"></script>
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
                
                console.log("Scale debug:", {
                  windowWidth: window.innerWidth,
                  pageWidth: pageElement.offsetWidth,
                  pageWidthWithPadding: pageWidth,
                  scaleFactor,
                  timestamp: new Date().toISOString()
                });

                // const htmlElement = document.querySelector("html");
                // if (htmlElement) {
                //   htmlElement.style.transform = "scale(" + scaleFactor + ") translateX(" + horizontalPadding + "px)";
                // }
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
            
            // Register Paged.js handler when API is available
            if (typeof Paged !== "undefined") {
              class MyHandler extends Paged.Handler {
                afterPageLayout(pageFragment, page) {
                  try {
                    console.log("afterPageLayout triggered");
                    scaleToFit();
                    var scrollpos = localStorage.getItem("scrollpos");
                    if (scrollpos) window.scrollTo(0, parseInt(scrollpos, 10));
                    document.querySelector("html").style.visibility = "visible";

                    // Get document size
                    const documentEl = document.getElementById('document');
                    const documentSize = documentEl?.getAttribute('data-size');

                    // Notify parent window when layout is complete
                    window.parent.postMessage({ 
                      type: 'layoutComplete',
                      documentSize,
                      timestamp: new Date().toISOString()
                    }, '*');
                    console.log("layoutComplete message sent", { documentSize });
                  } catch (err) {
                    console.error("Error in afterPageLayout:", err);
                    // Still show content even if there's an error
                    document.querySelector("html").style.visibility = "visible";
                  }
                }
              }
              Paged.registerHandlers(MyHandler);
              console.log("Paged.js registered handlers");
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