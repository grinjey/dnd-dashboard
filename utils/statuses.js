let statusList = {
    Prone: false,
    Restrained: false,
    Blinded: false,
    Charmed: false,
    Frightened: false,
    Grappled: false,
    Invisible: false,
    Paralyzed: false,
    Poisoned: false,
    Stunned: false,
    Unconscious: false,
    Exhausted: false,
    Incapacitated: false
  };

let statusColors = {
    Prone: "#008b8b",
    Restrained: "#006400",
    Blinded: "#c0c0c0",
    Charmed: "#ff69b4",
    Frightened: "#800080",
    Grappled: "#a52a2a",
    Invisible: "warning",
    Paralyzed: "#ffff00",
    Poisoned: "#9acd32",
    Stunned: "#ffd700",
    Unconscious: "#000000",
    Exhausted: "#dc143c",
    Incapacitated: "#f8f8ff"
    };

  let statusTextColors = {
    Prone: "white",
    Restrained: "white",
    Blinded: "black",
    Charmed: "white",
    Frightened: "white",
    Grappled: "white",
    Invisible: "warning",
    Paralyzed: "black",
    Poisoned: "white",
    Stunned: "black",
    Unconscious: "white",
    Exhausted: "white",
    Incapacitated: "black"
    };

export {statusList, statusColors, statusTextColors};