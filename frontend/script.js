async function predict() {
    const data = {
        average_cost_for_two: Number(document.getElementById("cost").value),
        votes: Number(document.getElementById("votes").value),
        online_order: Number(document.getElementById("online").value),
        table_booking: Number(document.getElementById("table").value)
    };

    const response = await fetch("/predict", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    const result = await response.json();
    document.getElementById("result").innerText =
        "Predicted Rating: " + result.predicted_rating;
}
