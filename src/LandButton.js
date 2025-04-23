function LandButton() {
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/land-drone", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await response.json();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button type="submit">Land Sequence</button>
            </form>
        </div>
    );
}

export default LandButton;
