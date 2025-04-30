import { useState } from "react";

function CommandLine() {
    const [userInput, setUserInput] = useState("");
    const [output, setOutput] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/cmd", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ input: userInput }),
            });

            const data = await response.json();
            setOutput(data.output || data.error);
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
                    placeholder="Command Line"
                />
                <button type="submit">Submit</button>
            </form>
            <pre>{output}</pre>
        </div>
    );
}

export default CommandLine;
