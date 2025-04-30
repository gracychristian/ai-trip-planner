import { Box, Button, TextField } from "@mui/material";

const ChatInput = ({ handleKeyDown, setInputValue, inputValue }: any) => {
    return (
        <Box sx={{ display: 'flex', padding: 1, backgroundColor: '#fff', position: "fixed", bottom: 0, width: "inherit" }}>
            <TextField
                variant="outlined"
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                fullWidth
                sx={{ marginRight: 1 }}
            />
            <Button variant="contained" color="primary" onClick={(e) => handleKeyDown(e)}>
                Send
            </Button>
        </Box>
    )
}

export default ChatInput;