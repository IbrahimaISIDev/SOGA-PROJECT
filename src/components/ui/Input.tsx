"use client";

import { forwardRef } from "react";

type InputState = "default" | "error" | "success";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  state?: InputState;
  message?: string;
}

const stateClasses: Record<InputState, string> = {
  default:
    "border-soga-line focus:border-soga-gold focus:ring-1 focus:ring-soga-gold/30",
  error:
    "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-200",
  success:
    "border-green-500 focus:border-green-600 focus:ring-1 focus:ring-green-200",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, state = "default", message, id, className = "", ...props },
  ref
) {
  const inputId = id ?? `input-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-small font-medium text-soga-ink"
      >
        {label}
        {props.required && (
          <span className="text-red-500 ml-0.5" aria-hidden>
            *
          </span>
        )}
      </label>
      {hint && <p className="text-small text-soga-muted">{hint}</p>}
      <input
        ref={ref}
        id={inputId}
        className={
          `w-full px-4 py-3 bg-soga-surface border rounded-sm text-soga-ink placeholder:text-soga-muted ` +
          `transition-colors duration-150 font-sans text-[15px] min-h-[44px] ` +
          `focus-visible:outline-none ` +
          `${stateClasses[state]} ${className}`
        }
        aria-invalid={state === "error" ? "true" : undefined}
        aria-describedby={message ? `${inputId}-message` : undefined}
        {...props}
      />
      {message && (
        <p
          id={`${inputId}-message`}
          role={state === "error" ? "alert" : undefined}
          className={`text-small ${state === "error" ? "text-red-600" : "text-green-600"}`}
        >
          {message}
        </p>
      )}
    </div>
  );
});

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  state?: InputState;
  message?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { label, hint, state = "default", message, id, className = "", ...props },
    ref
  ) {
    const inputId = id ?? `textarea-${label.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-small font-medium text-soga-ink"
        >
          {label}
          {props.required && (
            <span className="text-red-500 ml-0.5" aria-hidden>
              *
            </span>
          )}
        </label>
        {hint && <p className="text-small text-soga-muted">{hint}</p>}
        <textarea
          ref={ref}
          id={inputId}
          className={
            `w-full px-4 py-3 bg-soga-surface border rounded-sm text-soga-ink placeholder:text-soga-muted ` +
            `transition-colors duration-150 font-sans text-[15px] resize-y ` +
            `focus-visible:outline-none ` +
            `${stateClasses[state]} ${className}`
          }
          aria-invalid={state === "error" ? "true" : undefined}
          aria-describedby={message ? `${inputId}-message` : undefined}
          {...props}
        />
        {message && (
          <p
            id={`${inputId}-message`}
            role={state === "error" ? "alert" : undefined}
            className={`text-small ${state === "error" ? "text-red-600" : "text-green-600"}`}
          >
            {message}
          </p>
        )}
      </div>
    );
  }
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  hint?: string;
  state?: InputState;
  message?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({
  label,
  hint,
  state = "default",
  message,
  id,
  options,
  placeholder,
  className = "",
  ...props
}: SelectProps) {
  const inputId = id ?? `select-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-small font-medium text-soga-ink"
      >
        {label}
        {props.required && (
          <span className="text-red-500 ml-0.5" aria-hidden>
            *
          </span>
        )}
      </label>
      {hint && <p className="text-small text-soga-muted">{hint}</p>}
      <select
        id={inputId}
        className={
          `w-full px-4 py-3 bg-soga-surface border rounded-sm text-soga-ink ` +
          `transition-colors duration-150 font-sans text-[15px] min-h-[44px] ` +
          `focus-visible:outline-none appearance-none ` +
          `${stateClasses[state]} ${className}`
        }
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {message && (
        <p
          id={`${inputId}-message`}
          role={state === "error" ? "alert" : undefined}
          className={`text-small ${state === "error" ? "text-red-600" : "text-green-600"}`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
