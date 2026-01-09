

const app = document.getElementById("app");

const wrapper = document.createElement("div");
wrapper.className = "p-3 rounded shadow bg-white";
wrapper.style.width = "320px";


const display = document.createElement("input");
display.type = "text";
display.className = "form-control mb-3 text-end fs-4";
display.disabled = true;
display.value = "0";
wrapper.appendChild(display);


const buttonValues = [
    ["C", "←", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", "00", "=",]
];

const btnContainer = document.createElement("div");
btnContainer.className = "d-grid gap-2";
wrapper.appendChild(btnContainer);

buttonValues.forEach(row => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "d-flex gap-2";

    row.forEach(val => {
        const btn = document.createElement("button");
        btn.className = val === "="
            ? "btn btn-primary flex-fill"
            : "btn btn-outline-secondary flex-fill";
        btn.textContent = val;

        btn.onclick = () => onButtonPress(val);
        rowDiv.appendChild(btn);
    });

    btnContainer.appendChild(rowDiv);
});

app.appendChild(wrapper);



function onButtonPress(key) {
    let current = display.value;

    if (key === "C") {
        display.value = "0";
        return;
    }

    if (key === "←") {
        display.value = current.length > 1 ? current.slice(0, -1) : "0";
        return;
    }

    if (key === "=") {
        try {
            display.value = eval(current);   // handles infix expressions
        } catch {
            alert("Invalid Expression");
        }
        return;
    }

    if (current === "0")
        display.value = key;
    else
        display.value += key;
}




document.addEventListener("keydown", (e) => {
    const allowedNumbers = "0123456789";
    const allowedOps = "+-*/%";
    const key = e.key;

    if (allowedNumbers.includes(key)) {
        if (display.value === "0") display.value = key;
        else display.value += key;
    }
    else if (allowedOps.includes(key)) {
        display.value += key;
    }
    else if (key === "Backspace") {
        display.value = display.value.length > 1 ? display.value.slice(0, -1) : "0";
    }
    else if (key === "Enter") {
        try { display.value = eval(display.value); }
        catch { alert("Invalid Expression"); }
    }
    else {
        e.preventDefault();
        alert("Only numbers are allowed");
    }
});
