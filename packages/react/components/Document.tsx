import { useEffect } from "react";
import { DocumentContextProvider } from "./DocumentContext";

const sizes = ["A3", "A4", "A5", "letter", "legal"];
const orientations = ["portrait", "landscape"];

interface Props {
    size: typeof sizes[number];
    orientation: typeof orientations[number];
    margin?: React.CSSProperties["margin"];
    children: React.ReactNode;
};

const Document: React.FC<Props> = ({ size, orientation, margin, children }) => {
    useEffect(() => {
        const updateBodyClass = (size: typeof sizes[number], orientation: typeof orientations[number]) => {
            const body = document.body;

            body.classList.remove(...sizes, ...orientations);
            body.classList.add(size, orientation);
        };

        updateBodyClass(size, orientation);
    }, [size, orientation]);

    return (
        <DocumentContextProvider defaults={{ pageSize: size, orientation, margin }}>
            <main style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {children}
            </main>
        </DocumentContextProvider>
    );
};

export default Document;