import { Box, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import ReactMarkdown from 'react-markdown';

const ChatBox = ({ messages, errorMessage }: any) => {
    return (
        <Box
            sx={{
                padding: 2,
                overflowY: 'auto',
                height: 'calc(100vh - 140px)',
                backgroundColor: '#f5f5f5',
            }}
        >
            <List>
                {messages.map((msg: any, index: number) => (
                    <ListItem key={index} sx={{ justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                        <Paper
                            sx={{
                                padding: 1,
                                borderRadius: 2,
                                backgroundColor: msg.role === 'user' ? '#afeeee' : '#fff',
                                maxWidth: '70%',
                            }}
                        >
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </Paper>
                    </ListItem>
                ))}
                {errorMessage && <Box sx={{
                    margin: "18px", display: "flex",
                    justifyContent: "center"
                }}>
                    <Typography sx={{ mt: 2 }}>{errorMessage}</Typography>
                    <h3 className="border-solid border-2 border-red-400 bg-red-100 p-[16px] w-[400px]">{errorMessage}</h3>
                </Box>}
            </List >
        </Box >
    );
}

export default ChatBox;