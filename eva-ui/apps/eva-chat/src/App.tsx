import RootLayout from "./routes/RootLayout";
import { ChatShell } from "./components/chat/ChatShell";

export default function App() {
    return (
        <RootLayout>
            <ChatShell />
        </RootLayout>
    );
}
