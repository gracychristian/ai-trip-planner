import { Box, Button, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatInput = ({ handleKeyDown, setInputValue, inputValue }: any) => {
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleKeyDown();
        }
    };

  return (
    <Box
      sx={{
        display: "flex",
        padding: 1,
        backgroundColor: "#fff",
        position: "fixed",
        bottom: 0,
        width: "inherit",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <Box sx={{ position: "relative", width: "100%" }}>
        <TextField
          placeholder="Type a message..."
          multiline
          minRows={1}
          maxRows={6}
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={onKeyDown}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "24px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "24px",
              paddingRight: "48px",
            },
          }}
        />
        <IconButton
          onClick={handleKeyDown}
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            backgroundColor: "#008e91",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#00787b",
            },
            width: 40,
            height: 40,
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatInput;
