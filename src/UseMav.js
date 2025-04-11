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
        } catch (error) {
            console.error("Error:", error);
            setOutput("Failed to run executable.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button type="submit">Run</button>
            </form>
        </div>
    );
}

export default UseMav;
