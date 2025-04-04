import { useState } from "react";

function UseMav() {
    const [userInput, setUserInput] = useState("");
    const [output, setOutput] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/run-exec", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ input: userInput }),
            });

            const data = await response.json();
            setOutput(data.output || data.error);
            console.log(data.output);
            console.log(data.error);
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
                    placeholder="Enter drone input"
                />
                <button type="submit">Run</button>
            </form>
            <h6>Output:</h6>
            <pre>{output}</pre>
        </div>
    );
}

export default UseMav;
