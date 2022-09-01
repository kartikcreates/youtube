import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const GlobalChat = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", width: "50%", margin: "auto", justifyContent: "center" }} >
            <div className="chatContainer" style={{ backgroundColor: "#e6e6e6", marginTop: "20px", height: "90vh" }}></div>
            <div className="chatType" style={{ display: "flex", alignItems: "center", margin: "0px 40px" }}>
                <div style={{ width: "100%" }}><TextField id="standard-basic" label="Standard" variant="standard" style={{ width: "100%" }} /></div>
                <div>
                    <Button variant="contained" endIcon={<SendIcon />}>
                        Send
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default GlobalChat;
