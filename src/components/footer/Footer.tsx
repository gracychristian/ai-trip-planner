import { useTheme } from "@mui/material";

export const Footer = () => {
    const theme = useTheme();
    return <>
        <div className="h-[50px]"
        style={{
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.secondary.main,
            padding: '16px',
          }}>
            Footer
        </div>
    </>;
}