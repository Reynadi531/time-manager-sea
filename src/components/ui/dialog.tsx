// components/ui/dialog.tsx


import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";


export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm ${className}`}
        {...props}
    />
));
DialogOverlay.displayName = "DialogOverlay";


export const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={`fixed top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg ${className}`}
            {...props}
        >
            {children}
        </DialogPrimitive.Content>
    </DialogPortal>
));
DialogContent.displayName = "DialogContent";


export const DialogHeader: React.FC<React.PropsWithChildren> = ({ children }) => (
    <div className="mb-4 flex flex-col space-y-1">{children}</div>
);


export const DialogFooter: React.FC<React.PropsWithChildren> = ({ children }) => (
    <div className="mt-4 flex justify-end space-x-2">{children}</div>
);


export const DialogTitle: React.FC<React.PropsWithChildren> = ({ children }) => (
    <DialogPrimitive.Title className="text-lg font-semibold">{children}</DialogPrimitive.Title>
);


export const DialogDescription: React.FC<React.PropsWithChildren> = ({ children }) => (
    <DialogPrimitive.Description className="text-sm text-gray-500">{children}</DialogPrimitive.Description>
);