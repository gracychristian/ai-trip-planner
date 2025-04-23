import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Paper, TextField, Button } from "@mui/material";
import axios from "axios";

const App = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  console.log("apiKey",apiKey);
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

  return (
    // <Box className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex justify-center items-center px-4 py-8">
    //   <Paper elevation={4} className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-xl flex flex-col bg-white">
    //     <Box className="bg-blue-600 text-white px-6 py-4">
    //       <Typography variant="h5" className="font-semibold">✈️ AI Trip Planner</Typography>
    //     </Box>

    //     <Box className="flex-1 overflow-y-auto px-4 py-6 h-[500px]">
    //       {messages.map((msg, i) => (
    //         <Box
    //           key={i}
    //           className={`flex mb-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
    //         >
    //           <Box
    //             className={`px-4 py-2 rounded-2xl max-w-[70%] whitespace-pre-line text-sm shadow ${msg.role === "user"
    //                 ? "bg-green-100 text-right"
    //                 : "bg-gray-100 text-left"
    //               }`}
    //           >
    //             {msg.content}
    //           </Box>
    //         </Box>
    //       ))}
    //       {loading && (
    //         <Box className="text-sm text-gray-500 italic mb-2">Typing...</Box>
    //       )}
    //       <div ref={chatEndRef}></div>
    //     </Box>

    //     <Box className="border-t px-4 py-3 flex gap-2">
    //       <TextField
    //         fullWidth
    //         value={input}
    //         onChange={(e) => setInput(e.target.value)}
    //         onKeyDown={handleKeyDown}
    //         placeholder="Type your message..."
    //         size="small"
    //       />
    //       <Button variant="contained" onClick={sendMessage} disabled={loading}>
    //         Send
    //       </Button>
    //     </Box>
    //   </Paper>
    // </Box>
    <>
    <div>
      
    </div>
    </>
  );
};

export default App;
