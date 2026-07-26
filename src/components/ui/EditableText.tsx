'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePortfolioData } from '@/context/PortfolioDataContext';
import { cn } from '@/lib/utils';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  as?: React.ElementType;
  multiline?: boolean;
  placeholder?: string;
}

export function EditableText({ 
  value, 
  onChange, 
  className, 
  as: Component = 'span', 
  multiline = false,
  placeholder = 'Click to edit...'
}: EditableTextProps) {
  const { isEditable } = usePortfolioData();
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef<HTMLElement>(null);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    if (!isEditing) {
      setLocalValue(value);
      if (textRef.current && textRef.current.innerText !== value) {
        textRef.current.innerText = value || (isEditable ? placeholder : '');
      }
    }
  }, [value, isEditing, isEditable, placeholder]);

  const handleBlur = () => {
    setIsEditing(false);
    if (textRef.current) {
      const newValue = textRef.current.innerText.trim();
      if (newValue !== value) {
        onChange(newValue);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      textRef.current?.blur();
    }
  };

  if (!isEditable) {
    return <Component className={className}>{value}</Component>;
  }

  return (
    <Component
      ref={textRef}
      contentEditable={true}
      suppressContentEditableWarning={true}
      onFocus={() => setIsEditing(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={cn(
        "outline-none transition-all duration-200 cursor-text px-1 -mx-1",
        isEditing 
          ? "bg-zinc-800/20 ring-2 ring-indigo-500/50 rounded-md" 
          : "hover:bg-zinc-500/10 hover:ring-1 hover:ring-zinc-400/20 rounded-md",
        !value && "opacity-50 italic",
        className
      )}
    >
      {localValue || placeholder}
    </Component>
  );
}
