
import React, { useEffect, useState } from "react";

interface ZoomableImageProps {
  parameters: {
    imagePath: string;
    alt?: string;
  };
}

export default function ZoomableImage({
  parameters,
}: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { imagePath, alt = "Study visualization" } = parameters;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* Main image */}
      <div
        style={{
          width: "100%",
          maxWidth: "350px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <img
          src={imagePath}
          alt={alt}
          onClick={() => setIsOpen(true)}
          style={{
            width: "100%",
            height: "auto",
            cursor: "zoom-in",
            display: "block",
          }}
        />
      </div>

      {/* Full-screen image overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            backgroundColor: "rgba(0, 0, 0, 0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            cursor: "zoom-out",
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close enlarged image"
            style={{
              position: "absolute",
              top: "0px",
              right: "30px",
              background: "transparent",
              color: "white",
              border: "none",
              fontSize: "36px",
              cursor: "pointer",
              zIndex: 100000,
            }}
          >
            &times;
          </button>

          {/* Enlarged image */}
          <img
            src={imagePath}
            alt={alt}
            onClick={(event) => event.stopPropagation()}
            style={{
              maxWidth: "70vw",
              maxHeight: "70vh",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              cursor: "default",
            }}
          />
        </div>
      )}
    </>
  );
}
