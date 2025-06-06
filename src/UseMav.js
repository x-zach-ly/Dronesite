import { useState } from "react";

function UseMav({status, setStatus}) {
    const [userInput, setUserInput] = useState("");
    const [output, setOutput] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/start-mavproxy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ input: userInput }),
            });

            const data = await response.json();
            setOutput(data.output || data.error);
            setStatus("Active");
        } catch (error) {
            console.error("Error:", error);
            setOutput("Failed to run executable.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Port (e.g. com9)"
                />
                <button type="submit">Run MavProxy</button>
            </form>
        </div>
    );
}

export default UseMav;
