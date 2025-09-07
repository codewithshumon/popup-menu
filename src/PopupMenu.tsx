import React, { useState, useRef, useEffect } from "react";
import "./PopupMenu.css";

export type PositionType =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "left-top"
  | "left-center"
  | "left-bottom"
  | "right-top"
  | "right-center"
  | "right-bottom"
  | "auto";

export type SpecificPositionType = Exclude<PositionType, "auto">;

export interface PopupMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  menuClassName?: string;
  position?: PositionType;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  animationDuration?: number;
  viewportPadding?: number;
}

export const PopupMenu: React.FC<PopupMenuProps> = ({
  trigger,
  children,
  header,
  footer,
  className = "",
  menuClassName = "",
  position = "auto",
  onOpenChange,
  onClose,
  animationDuration = 200,
  viewportPadding = 5,
}) => {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [calculatedPosition, setCalculatedPosition] =
    useState<SpecificPositionType>("bottom-left");
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setOpen(true);
      setTimeout(() => {
        setIsVisible(true);
        calculatePosition();
      }, 10);
    } else {
      setIsVisible(false);
      timeoutRef.current = setTimeout(() => {
        setOpen(false);
        onClose?.();
      }, animationDuration);
    }
    onOpenChange?.(isOpen);
  };


  const doesPositionFit = (
    pos: SpecificPositionType,
    menuRect: DOMRect,
    triggerRect: DOMRect,
    viewportWidth: number,
    viewportHeight: number
  ): boolean => {
    const [direction, alignment] = pos.split("-") as [
      "top" | "bottom" | "left" | "right",
      "left" | "center" | "right" | "top" | "bottom"
    ];

    let menuLeft = 0;
    let menuTop = 0;

    switch (direction) {
      case "top":
        menuTop = triggerRect.top - menuRect.height;
        break;
      case "bottom":
        menuTop = triggerRect.bottom;
        break;
      case "left":
        menuLeft = triggerRect.left - menuRect.width;
        break;
      case "right":
        menuLeft = triggerRect.right;
        break;
    }

    switch (alignment) {
      case "left":
        if (direction === "top" || direction === "bottom") {
          menuLeft = triggerRect.left;
        } else if (direction === "left" || direction === "right") {
          menuTop = triggerRect.top;
        }
        break;
      case "right":
        if (direction === "top" || direction === "bottom") {
          menuLeft = triggerRect.right - menuRect.width;
        } else if (direction === "left" || direction === "right") {
          menuTop = triggerRect.bottom - menuRect.height;
        }
        break;
      case "center":
        if (direction === "top" || direction === "bottom") {
          menuLeft =
            triggerRect.left + (triggerRect.width - menuRect.width) / 2;
        } else if (direction === "left" || direction === "right") {
          menuTop =
            triggerRect.top + (triggerRect.height - menuRect.height) / 2;
        }
        break;
      case "top":
        if (direction === "left" || direction === "right") {
          menuTop = triggerRect.top;
        }
        break;
      case "bottom":
        if (direction === "left" || direction === "right") {
          menuTop = triggerRect.bottom - menuRect.height;
        }
        break;
    }

    return (
      menuLeft >= viewportPadding &&
      menuLeft + menuRect.width <= viewportWidth - viewportPadding &&
      menuTop >= viewportPadding &&
      menuTop + menuRect.height <= viewportHeight - viewportPadding
    );
  };

  const calculateOverflow = (
    pos: SpecificPositionType,
    menuRect: DOMRect,
    triggerRect: DOMRect,
    viewportWidth: number,
    viewportHeight: number
  ): number => {
    const [direction, alignment] = pos.split("-") as [
      "top" | "bottom" | "left" | "right",
      "left" | "center" | "right" | "top" | "bottom"
    ];

    let menuLeft = 0;
    let menuTop = 0;

    switch (direction) {
      case "top":
        menuTop = triggerRect.top - menuRect.height;
        break;
      case "bottom":
        menuTop = triggerRect.bottom;
        break;
      case "left":
        menuLeft = triggerRect.left - menuRect.width;
        break;
      case "right":
        menuLeft = triggerRect.right;
        break;
    }

    switch (alignment) {
      case "left":
        if (direction === "top" || direction === "bottom") {
          menuLeft = triggerRect.left;
        } else if (direction === "left" || direction === "right") {
          menuTop = triggerRect.top;
        }
        break;
      case "right":
        if (direction === "top" || direction === "bottom") {
          menuLeft = triggerRect.right - menuRect.width;
        } else if (direction === "left" || direction === "right") {
          menuTop = triggerRect.bottom - menuRect.height;
        }
        break;
      case "center":
        if (direction === "top" || direction === "bottom") {
          menuLeft =
            triggerRect.left + (triggerRect.width - menuRect.width) / 2;
        } else if (direction === "left" || direction === "right") {
          menuTop =
            triggerRect.top + (triggerRect.height - menuRect.height) / 2;
        }
        break;
      case "top":
        if (direction === "left" || direction === "right") {
          menuTop = triggerRect.top;
        }
        break;
      case "bottom":
        if (direction === "left" || direction === "right") {
          menuTop = triggerRect.bottom - menuRect.height;
        }
        break;
    }

    const leftOverflow = Math.max(0, viewportPadding - menuLeft);
    const rightOverflow = Math.max(
      0,
      menuLeft + menuRect.width - (viewportWidth - viewportPadding)
    );
    const topOverflow = Math.max(0, viewportPadding - menuTop);
    const bottomOverflow = Math.max(
      0,
      menuTop + menuRect.height - (viewportHeight - viewportPadding)
    );

    return leftOverflow + rightOverflow + topOverflow + bottomOverflow;
  };

  const findFallbackPosition = (
    menuRect: DOMRect,
    triggerRect: DOMRect,
    viewportWidth: number,
    viewportHeight: number
  ): SpecificPositionType => {
    const positions: SpecificPositionType[] = [
      "bottom-left",
      "bottom-center",
      "bottom-right",
      "top-left",
      "top-center",
      "top-right",
      "left-top",
      "left-center",
      "left-bottom",
      "right-top",
      "right-center",
      "right-bottom",
    ];

    for (const pos of positions) {
      if (
        doesPositionFit(
          pos,
          menuRect,
          triggerRect,
          viewportWidth,
          viewportHeight
        )
      ) {
        return pos;
      }
    }

    let bestPosition: SpecificPositionType = "bottom-left";
    let minOverflow = Infinity;

    for (const pos of positions) {
      const overflow = calculateOverflow(
        pos,
        menuRect,
        triggerRect,
        viewportWidth,
        viewportHeight
      );
      if (overflow < minOverflow) {
        minOverflow = overflow;
        bestPosition = pos;
      }
    }

    return bestPosition;
  };

  const calculatePosition = () => {
    if (!menuRef.current || !triggerRef.current) return;

    const menuRect = menuRef.current.getBoundingClientRect();
    const triggerRect = triggerRef.current.getBoundingClientRect();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const spaceAbove = triggerRect.top - viewportPadding;
    const spaceBelow = viewportHeight - triggerRect.bottom - viewportPadding;
    const spaceLeft = triggerRect.left - viewportPadding;
    const spaceRight = viewportWidth - triggerRect.right - viewportPadding;

    if (position === "auto") {
      const isNearTopEdge = triggerRect.top < viewportPadding * 2;
      const isNearBottomEdge =
        triggerRect.bottom > viewportHeight - viewportPadding * 2;
      const isNearLeftEdge = triggerRect.left < viewportPadding * 2;
      const isNearRightEdge =
        triggerRect.right > viewportWidth - viewportPadding * 2;

      let bestPosition: SpecificPositionType = "bottom-left";
      
      if (isNearRightEdge && isNearTopEdge) {
        bestPosition = "left-top";
      } else if (isNearRightEdge && isNearBottomEdge) {
        bestPosition = "left-bottom";
      } else if (isNearLeftEdge && isNearTopEdge) {
        bestPosition = "right-top";
      } else if (isNearLeftEdge && isNearBottomEdge) {
        bestPosition = "right-bottom";
      } else {
        const hasVerticalSpace = spaceBelow > spaceAbove;
        const hasHorizontalSpace = spaceRight > spaceLeft;
        const moreVerticalSpace =
          spaceAbove + spaceBelow > spaceLeft + spaceRight;

        if (moreVerticalSpace) {
          if (hasVerticalSpace) {
            if (spaceRight >= menuRect.width) {
              bestPosition = "bottom-right";
            } else if (spaceLeft >= menuRect.width) {
              bestPosition = "bottom-left";
            } else {
              bestPosition = "bottom-center";
            }
          } else {
            if (spaceRight >= menuRect.width) {
              bestPosition = "top-right";
            } else if (spaceLeft >= menuRect.width) {
              bestPosition = "top-left";
            } else {
              bestPosition = "top-center";
            }
          }
        } else {
          if (hasHorizontalSpace) {
            if (spaceBelow >= menuRect.height) {
              bestPosition = "right-bottom";
            } else if (spaceAbove >= menuRect.height) {
              bestPosition = "right-top";
            } else {
              bestPosition = "right-center";
            }
          } else {
            if (spaceBelow >= menuRect.height) {
              bestPosition = "left-bottom";
            } else if (spaceAbove >= menuRect.height) {
              bestPosition = "left-top";
            } else {
              bestPosition = "left-center";
            }
          }
        }
      }

      if (
        !doesPositionFit(
          bestPosition,
          menuRect,
          triggerRect,
          viewportWidth,
          viewportHeight
        )
      ) {
        bestPosition = findFallbackPosition(
          menuRect,
          triggerRect,
          viewportWidth,
          viewportHeight
        );
      }

      setCalculatedPosition(bestPosition);
      return;
    }

    let bestPosition: SpecificPositionType = position as SpecificPositionType;

    if (
      !doesPositionFit(
        bestPosition,
        menuRect,
        triggerRect,
        viewportWidth,
        viewportHeight
      )
    ) {
      bestPosition = findFallbackPosition(
        menuRect,
        triggerRect,
        viewportWidth,
        viewportHeight
      );
    }

    setCalculatedPosition(bestPosition);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        handleOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("resize", calculatePosition);
      window.addEventListener("scroll", calculatePosition);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", calculatePosition);
      window.removeEventListener("scroll", calculatePosition);
    };
  }, [open]);

  const getPositionClasses = () => {
    const positionToUse = position === "auto" ? calculatedPosition : position;
    const [direction, alignment] = positionToUse.split("-") as [
      "top" | "bottom" | "left" | "right",
      "left" | "center" | "right" | "top" | "bottom"
    ];

    let positionClasses = "";

    switch (direction) {
      case "top":
        positionClasses += "bottom-full ";
        break;
      case "bottom":
        positionClasses += "top-full ";
        break;
      case "left":
        positionClasses += "right-full ";
        break;
      case "right":
        positionClasses += "left-full ";
        break;
    }

    switch (alignment) {
      case "left":
        positionClasses += "left-0 ";
        break;
      case "right":
        positionClasses += "right-0 ";
        break;
      case "center":
        if (direction === "top" || direction === "bottom") {
          positionClasses += "left-1-2 ";
        } else {
          positionClasses += "top-1-2 ";
        }
        break;
      case "top":
        positionClasses += "top-0 ";
        break;
      case "bottom":
        positionClasses += "bottom-0 ";
        break;
    }

    return positionClasses;
  };

  const getAnimationClass = () => {
    return isVisible ? "popup-menu-visible" : "";
  };

  // Simple class name concatenation function
  const combineClassNames = (...classes: (string | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <div className={combineClassNames("popup-menu-wrapper", className)}>
      <div
        ref={triggerRef}
        onClick={() => handleOpenChange(!open)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleOpenChange(!open);
          }
        }}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      {open && (
        <div
          ref={menuRef}
          className={combineClassNames(
            "popup-menu",
            getPositionClasses(),
            getAnimationClass(),
            menuClassName
          )}
          role="menu"
          style={{
            transitionDuration: `${animationDuration}ms`,
            maxHeight: `calc(100vh - ${viewportPadding * 2}px)`,
            overflowY: "auto",
          }}
        >
          {header && <div className="popup-menu-header">{header}</div>}

          <div className="popup-menu-content">
            {React.Children.map(children, (child) =>
              React.isValidElement(child)
                ? React.cloneElement(child as React.ReactElement<any>, {
                    onClick: (e: React.MouseEvent) => {
                      (child.props as any)?.onClick?.(e);
                      handleOpenChange(false);
                    },
                    className: combineClassNames(
                      "popup-menu-item",
                      child.props.className || ""
                    ),
                  })
                : child
            )}
          </div>

          {footer && <div className="popup-menu-footer">{footer}</div>}
        </div>
      )}
    </div>
  );
};