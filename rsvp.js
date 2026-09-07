const guestList = [
    "Nick Gilreath",
    "Scout Jasper",
    "Jenny Thomas",
    "Heidi Jasper"
];

function searchName() {
    const input = document.getElementById("nameInput").value.toLowerCase();
    const result = document.getElementById("result");

    const match = guestList.find(name => 
        name.toLowerCase().includes(input)
    );

    if (match) {
        result.textContent = "Welcome " + match + "! Please continue your RSVP.";
    } else {
        result.textContent = "Name not found. Please check spelling.";
    }
}