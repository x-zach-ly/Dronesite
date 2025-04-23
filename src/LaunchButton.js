function LaunchButton() {
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/launch-drone", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });

        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button type="submit">Launch Sequence</button>
            </form>
        </div>
    );
}

export default LaunchButton;
