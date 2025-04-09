"use client"

import type React from "react"

import { useState } from "react"

// Simple chat interface without external components
export default function Chat() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === "") return

    // Add user message to the chat
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Send request to API route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch response")
      }

      const data = await response.json()
      
      // Add AI response to messages
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }])
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, there was an error processing your request." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>GPT Chat Demo</h1>

      <div
        style={{
          height: "60vh",
          overflowY: "auto",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "16px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: "#888",
            }}
          >
            Start a conversation by sending a message
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  maxWidth: "80%",
                  padding: "10px 16px",
                  borderRadius: "18px",
                  backgroundColor: msg.role === "user" ? "#1a73e8" : "#e0e0e0",
                  color: msg.role === "user" ? "white" : "black",
                  borderBottomRightRadius: msg.role === "user" ? "4px" : "18px",
                  borderBottomLeftRadius: msg.role === "user" ? "18px" : "4px",
                }}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "12px" }}>
            <div
              style={{
                maxWidth: "80%",
                padding: "10px 16px",
                borderRadius: "18px",
                backgroundColor: "#e0e0e0",
                color: "black",
                borderBottomLeftRadius: "4px",
                display: "flex",
                gap: "4px",
              }}
            >
              <span
                className="typing-dot"
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#888",
                  display: "inline-block",
                  animation: "bounce 1.4s infinite ease-in-out both",
                  animationDelay: "0s",
                }}
              ></span>
              <span
                className="typing-dot"
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#888",
                  display: "inline-block",
                  animation: "bounce 1.4s infinite ease-in-out both",
                  animationDelay: "0.2s",
                }}
              ></span>
              <span
                className="typing-dot"
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#888",
                  display: "inline-block",
                  animation: "bounce 1.4s infinite ease-in-out both",
                  animationDelay: "0.4s",
                }}
              ></span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flexGrow: 1,
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
            fontSize: "16px",
          }}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || input.trim() === ""}
          style={{
            padding: "10px 20px",
            backgroundColor: "#1a73e8",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: isLoading || input.trim() === "" ? "not-allowed" : "pointer",
            opacity: isLoading || input.trim() === "" ? 0.7 : 1,
          }}
        >
          Send
        </button>
      </form>

      <style jsx global>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
      `}</style>
    </div>
  )
}
