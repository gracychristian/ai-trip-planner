import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid } from '@mui/material';
import axios from 'axios';
import ConversationList from './ConversationList';
import ChatInput from './ChatInput';
import ChatBox from './ChatBox';
import DestinationCarousel from './DestinationCarousel';

const systemPrompt = `
You are an empathetic and creative AI Trip Planner.

- Always respond warmly and kindly.
- If the user greets you (e.g., "hi", "hello", "good morning"), greet back and introduce yourself as a travel assistant.
- If the user asks travel-related questions (trips, itineraries, destinations, budgets, transportation), answer helpfully and in detail.
- If the user shares emotions (e.g., "I'm sad", "I'm bored", "I'm stressed"), acknowledge their feeling and suggest a type of trip (e.g., peaceful getaway, adventure trip, solo travel) that might help.
- If the user asks about unrelated topics (e.g., technology, cooking, sports), cleverly connect it back to a travel idea if possible.
- Always gently guide the conversation back to travel and trip planning.
- Maintain a friendly, empathetic, and positive tone throughout.

You are here to make people excited about traveling!
`.trim();

const ChatComponent = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hey there! I'm your AI travel planner. Where would you like to go?" }
  ]);
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const estimateTokens = (text: string) => {
    return Math.ceil(text.split(/\s+/).length * 1.5);
  };

  const trimMessages = (allMessages: any[], tokenLimit = 3000) => {
    const systemMsg = { role: "system", content: systemPrompt };
    const chatMessages = allMessages.filter(m => m.role !== 'system');

    const trimmed: any[] = [];
    let tokens = estimateTokens(systemMsg.content);

    for (let i = chatMessages.length - 1; i >= 0; i--) {
      const msg = chatMessages[i];
      const msgTokens = estimateTokens(msg.content);

      if (tokens + msgTokens > tokenLimit) break;

      trimmed.unshift(msg); // maintain correct order
      tokens += msgTokens;
    }

    return [systemMsg, ...trimmed];
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const updatedMessages = [...messages, { role: "user", content: input }];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const messagesToSend = trimMessages(updatedMessages);

      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: messagesToSend,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const reply = res.data.choices[0].message.content;
      setMessages([...updatedMessages, { role: "assistant", content: reply }]);
      setErrorMessage("");
    } catch (err) {
      console.error("Error from OpenAI:", err);
      setErrorMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = () => {
    sendMessage();
  };

  return (
    <Grid container sx={{ height: "100%" }}>
      <Box sx={{ display: "flex", height: "100%", width: "100%" }}>
        {/* <ConversationList /> */}
        <Grid size={{ sm: 6 }}>
          <DestinationCarousel />
        </Grid>
        <Grid size={{ sm: 6 }} sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <ChatBox messages={messages} errorMessage={errorMessage} />
          <ChatInput handleKeyDown={handleKeyDown} setInputValue={setInput} inputValue={input} />
          <div ref={chatEndRef} />
        </Grid>
      </Box>
    </Grid>
  );
};

export default ChatComponent;
