import * as React from "react";


interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}


export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => (
<textarea
ref={ref}
className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
{...props}
/>
));
Textarea.displayName = "Textarea";