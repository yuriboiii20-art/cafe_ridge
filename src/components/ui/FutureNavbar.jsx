import React, { useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { setupSvgRenderer } from "@left4code/svg-renderer";
import { cva } from "class-variance-authority";

/** 🔥 SVG FRAME COMPONENT **/
const Frame = ({
  className,
  paths,
  enableBackdropBlur,
  enableViewBox,
  ...props
}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current && svgRef.current.parentElement) {
      const instance = setupSvgRenderer({
        el: svgRef.current,
        paths,
        enableBackdropBlur,
        enableViewBox,
      });

      return () => instance.destroy();
    }
  }, [paths, enableViewBox, enableBackdropBlur]);

  return (
    <svg
      {...props}
      className={twMerge("absolute inset-0 size-full", className)}
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
    />
  );
};

/** 🎨 BUTTON VARIANTS & COLORS **/
const COLORS = {
  default: {
    stroke1: "#fbbf24", // Gold for Cafe Ridge
    fill1: "rgba(251, 191, 36, 0.22)",
    stroke2: "#fbbf24",
    fill2: "rgba(251, 191, 36, 0.1)",
    text: "#ffffff",
  }
};

const buttonVariants = cva(
  "group font-bold mb-2 relative px-8 py-2 cursor-pointer transition-all outline-none [&>span]:relative [&>span]:flex [&>span]:items-center [&>span]:justify-center",
  {
    variants: {
      shape: {
        default: "",
        flat: "",
        simple: "ps-8 pe-6",
      },
    },
    defaultVariants: {
      shape: "default",
    },
  }
);

/** 🔥 FUTURE BUTTON COMPONENT **/
const FutureButton = ({
  className,
  children,
  shape = "default",
  enableBackdropBlur = false,
  enableViewBox = false,
  customPaths,
  textColor,
  ...props
}) => {
  const colors = COLORS.default;

  return (
    <button
      {...props}
      style={{ color: textColor || colors.text }}
      className={twMerge(buttonVariants({ shape, className }))}
    >
      <div className="absolute inset-0 -mb-2">
        {!customPaths && (shape === "default" || shape === "flat") && (
          <Frame
            enableBackdropBlur={enableBackdropBlur}
            enableViewBox={enableViewBox}
            paths={[
              {
                show: true,
                style: { strokeWidth: "1", stroke: colors.stroke1, fill: colors.fill1 },
                path: [
                  ["M", "17", "0"],
                  ["L", "100% - 7", "0"],
                  ["L", "100% + 0", "0% + 9.5"],
                  ["L", "100% - 18", "100% - 6"],
                  ["L", "4", "100% - 6"],
                  ["L", "0", "100% - 15"],
                  ["L", "17", "0"],
                ],
              },
              {
                show: true,
                style: { strokeWidth: "1", stroke: colors.stroke2, fill: colors.fill2 },
                path: [
                  ["M", "9", "100% - 6"],
                  ["L", "100% - 22", "100% - 6"],
                  ["L", "100% - 25", "100% + 0"],
                  ["L", "12", "100% + 0"],
                  ["L", "9", "100% - 6"],
                ],
              },
            ]}
          />
        )}
      </div>
      <span>{children}</span>
    </button>
  );
};

export { Frame, FutureButton };