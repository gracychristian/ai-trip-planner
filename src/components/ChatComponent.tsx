import React, { useState } from 'react';
import { Box, Button, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material';

const ChatComponent = () => {
    const [messages, setMessages] = useState([
        { text: 'Hello! How are you?', type: 'sent' },
        { text: "I'm good, thanks! How about you?", type: 'received' },
        { text: 'Doing well, thank you!', type: 'sent' },
      ]);
      const [inputValue, setInputValue] = useState('');
    
      const handleSendMessage = () => {
        if (inputValue.trim()) {
          setMessages([...messages, { text: inputValue, type: 'sent' }]);
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
              <ListItem key={index} sx={{ justifyContent: msg.type === 'sent' ? 'flex-end' : 'flex-start' }}>
                <Paper
                  sx={{
                    padding: 1,
                    borderRadius: 2,
                    backgroundColor: msg.type === 'sent' ? '#dcf8c6' : '#fff',
                    maxWidth: '70%',
                  }}
                >
                  <ListItemText primary={msg.text} />
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
          <Button variant="contained" color="primary" onClick={handleSendMessage}>
            Send
          </Button>
        </Box>
      </Box>
    );
};

export default ChatComponent;