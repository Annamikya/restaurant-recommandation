async function predict() {
    const cost = document.getElementById("cost").value;
    const votes = document.getElementById("votes").value;
    const online = document.getElementById("online").value;
    const table = document.getElementById("table").value;
    const location = document.getElementById("location").value;
    const rest_type = document.getElementById("rest_type").value;
    
    // Validation
    if (!cost || !votes || online === "" || table === "" || !location || !rest_type) {
        document.getElementById("result").innerText = "Please fill in all fields.";
        return;
    }
    
    const data = {
        average_cost_for_two: Number(cost),
        votes: Number(votes),
        online_order: Number(online),
        table_booking: Number(table),
        location: Number(location),
        rest_type: Number(rest_type)
    };
    
    const resultElement = document.getElementById("result");
    const button = document.querySelector("button");
    
    // Show loading state
    resultElement.innerText = "Predicting...";
    resultElement.classList.add("loading");
    button.disabled = true;
    button.innerText = "Predicting...";
    
    try {
        const response = await fetch("/predict", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        resultElement.innerText = `Predicted Rating: ${result.predicted_rating} ⭐`;
        resultElement.classList.remove("loading");
    } catch (error) {
        console.error("Error:", error);
        resultElement.innerText = "Error predicting rating. Please try again.";
        resultElement.classList.remove("loading");
    } finally {
        button.disabled = false;
        button.innerText = "Predict Rating ⭐";
    }
}
