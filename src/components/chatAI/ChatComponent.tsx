import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';

const ChatComponent = () => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    console.log("apiKey", apiKey);
    const [messages, setMessages] = useState([
      { role: "assistant", content: "Hey there! I'm your AI travel planner. Where would you like to go?" },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement | null>(null);
  
    const scrollToBottom = () => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages, loading]);
  
    const sendMessage = async () => {
      if (!input.trim()) return;
  
      const newMessages = [...messages, { role: "user", content: input }];
      setMessages(newMessages);
      setInput("");
      setLoading(true);
  
      console.log("Using OpenAI Key:", apiKey); // Check if it's loaded properly
  
      try {
        const res = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: newMessages,
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        const reply = res.data.choices[0].message.content;
        setMessages([...newMessages, { role: "assistant", content: reply }]);
      } catch (err) {
        console.error("Error from OpenAI:", err);
        setMessages([
          ...newMessages,
          { role: "assistant", content: "Oops! Something went wrong." },
        ]);
      } finally {
        setLoading(false);
      }
    };
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") sendMessage();
    };
    
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            setMessages([...messages, { content: inputValue, role: 'user' }]);
            setInputValue('');
        }
    };
    return (
        <Box
            sx={{
                width: 400,
                height: 600,
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: 2,
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    padding: 2,
                    textAlign: 'center',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                }}
            >
                <Typography variant="h6">Chat Room</Typography>
            </Box>
            <Box
                sx={{
                    flex: 1,
                    padding: 2,
                    overflowY: 'auto',
                    backgroundColor: '#f5f5f5',
                }}
            >
                <List>
                    {messages.map((msg, index) => (
                        <ListItem key={index} sx={{ justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                            <Paper
                                sx={{
                                    padding: 1,
                                    borderRadius: 2,
                                    backgroundColor: msg.role === 'user' ? '#dcf8c6' : '#fff',
                                    maxWidth: '70%',
                                }}
                            >
                                <ListItemText primary={msg.content} />
                            </Paper>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box sx={{ display: 'flex', padding: 1, backgroundColor: '#fff' }}>
                <TextField
                    variant="outlined"
                    placeholder="Type a message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    fullWidth
                    sx={{ marginRight: 1 }}
                />
                <Button variant="contained" color="primary" onClick={() => handleKeyDown}>
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default ChatComponent;