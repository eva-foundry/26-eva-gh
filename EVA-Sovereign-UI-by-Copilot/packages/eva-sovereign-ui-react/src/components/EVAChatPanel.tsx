import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import type { EVAChatPanelElement, EVACustomEvent } from '../types';

export interface EVAChatPanelProps extends Omit<EVAChatPanelElement, 'ref'> {
  messages?: Array<{ role: string; content: string; timestamp?: string }>;
  onSendMessage?: (content: string) => void;
  loading?: boolean;
}

export interface EVAChatPanelRef {
  addMessage: (role: string, content: string) => void;
  clearHistory: () => void;
  setLoading: (loading: boolean) => void;
}

export const EVAChatPanel = forwardRef<EVAChatPanelRef, EVAChatPanelProps>(
  ({ children, messages, onSendMessage, loading, ...props }, ref) => {
    const internalRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      addMessage: (role: string, content: string) => {
        internalRef.current?.addMessage(role, content);
      },
      clearHistory: () => {
        internalRef.current?.clearHistory();
      },
      setLoading: (loading: boolean) => {
        internalRef.current?.setLoading(loading);
      },
    }));

    useEffect(() => {
      const element = internalRef.current;
      if (!element) return;

      const handleSend = (e: EVACustomEvent<{ content: string }>) => {
        onSendMessage?.(e.detail.content);
      };

      element.addEventListener('send-message', handleSend);
      return () => element.removeEventListener('send-message', handleSend);
    }, [onSendMessage]);

    useEffect(() => {
      if (internalRef.current && messages) {
        internalRef.current.messages = messages;
      }
    }, [messages]);

    useEffect(() => {
      if (internalRef.current && loading !== undefined) {
        internalRef.current.setLoading(loading);
      }
    }, [loading]);

    return (
      <eva-chat-panel ref={internalRef} {...props}>
        {children}
      </eva-chat-panel>
    );
  }
);

EVAChatPanel.displayName = 'EVAChatPanel';
