import { Box, Button, TextField } from "@mui/material";

const ChatInput = ({ handleKeyDown, setInputValue, inputValue }: any) => {
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleKeyDown();
        }
    };

    return (
        <Box sx={{ display: 'flex', padding: 1, backgroundColor: '#fff', position: "fixed", bottom: 0, width: "inherit" }}>
            <TextField
                variant="outlined"
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={onKeyDown}
                fullWidth
                sx={{ marginRight: 1 }}
            />
            <Button variant="contained" color="primary" onClick={() => handleKeyDown()}>
                Send
            </Button>
        </Box>
    )
}

export default ChatInput;