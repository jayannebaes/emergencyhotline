// Data for contacts by category and location
let contactsData = {
  hospital: {
    "Rodriguez": [{ name: "Casimiro A. Ynares", number: "09204327079"}, { name: "H-Vill", number: "0289978949"}],
    "Quezon-city": [{ name: "Quezon City General Hospital", number: "0288630800" }, { name: "Commonwealth Hospital and Medical Center", number: "0289300000"}],
    "Marikina": [{ name: "Marikina Valley Medical Center", number: "0286822222" }, { name: "Amang Rodriguez Memorial Medical Center", number: "0289415854"}],
  },
  baranggay: {
    "Rodriguez": [{ name: "Brgy. Rosario Montalban Rizal", number: "09124380205"}, { name: "Brgy. Balite", number: "09384265266"}, { name: "Brgy. San Isidro Rodriguez Rizal ", number: "09391524347"}, { name: "Brgy. San Jose", number: "0963164457"}],
    "Quezon-city": [{ name: "Brgy. Fairview Park", number: "09560915305" }, { name: "Sta. Cruz Baranggay Hall", number: "(02)8374451"}, { name: "Brgy. Hall Pasong Putik Proper", number: "0277992258"}, { name: "Brgy. Apolonio Samson", number: "09519255840"}],
    "Marikina": [{ name: "Marikina Heights Baranggay Hall", number: "028942052"}, { name: "Conception Dos Baranggay Hall", number: "0289420559"}, { name: "Barangka Baranggay Hall", number: "027933786"}],
  },
  police: {
    "Rodriguez": [{ name: "Community Police Assistance Center", number: "0272131062" }, { name: "Rodriguez Municipal Police Station", number: "09991955988"}, { name: "Rodriguez Police Station", number: "0272131062"}],
    "Quezon-city": [{ name: "QC Police District Station 9", number: "09152581067" }, { name: "QCPD Quezon City Hall Police Precint", number: "0289884242"}, { name: "Quezon City Police District Project 6 Station 15", number: "09617919571"}, { name: "Payatas Bagong Silangan Police Station 13", number: "09674079271"}],
    "Marikina": [{ name: "Marikina City Police Station", number: "0289421346" }, { name: "Marikina City Police Headquarters", number: "026461631"}, { name: "Marikina City Police Station PCP-8", number: "0289426101"}],
  },
    firestation: {
    "Rodriguez": [{ name: "BFP R4A Rodriguez Fire Station", number: "09663263209"}, { name: "Rodriguez Fire Station", number: "0285843498"}],
    "Quezon-city": [{ name: "Quezon City Fire Ditrict", number: "0289241922"}, { name: "Rolling Hills Fire Substation", number: "09913938899"}, { name: "Novaliches Fire Station", number: "0289363594"}],
    "Marikina": [{ name: "Marikina City Fire Sation", number: "0282739629"}, { name: "Parang Fire Station", number: "0275865017"}],
  },
};

// Selected category
let selectedCategory = '';
let callTimer;
let timerInterval;

// Category selection function
function selectCategory(category) {
  selectedCategory = category;
  document.getElementById('location-select').classList.remove('hidden');
  document.getElementById('contacts').classList.add('hidden');
  document.getElementById('phone-screen').classList.add('hidden');
}

// Display contacts based on selected location
function showContacts() {
  let location = document.getElementById('location').value;
  let contacts = contactsData[selectedCategory][location];
  let contactList = document.getElementById('contact-list');

  if (contacts) {
    document.getElementById('contacts').classList.remove('hidden');
    document.getElementById('contact-title').textContent = `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} in ${location.charAt(0).toUpperCase() + location.slice(1)}`;
    contactList.innerHTML = '';

    contacts.forEach(contact => {
      let listItem = document.createElement('li');
      listItem.innerHTML = `${contact.name}: ${contact.number} <button onclick="makeCall('${contact.name}', '${contact.number}')">Call</button>`;
      contactList.appendChild(listItem);
    });
  }
}

// Simulate calling a contact
function makeCall(name, number) {
  document.getElementById('phone-screen').classList.remove('hidden');
  document.getElementById('call-info').textContent = `${name} at ${number}...`;
document.getElementById('call-status').textContent = "Calling...";

  setTimeout(() => document.getElementById('call-status').textContent = "Connecting...", 2000);
  setTimeout(() => {
    document.getElementById('call-status').textContent = "Connected";
    document.getElementById('call-timer').classList.remove('hidden');
    startCallTimer();
    ringtone.pause();
    ringtone.currentTime = 0;
  }, 4000);

}

function startCallTimer() {
  let seconds = 0;
  callTimer = document.getElementById('call-timer');
  
  timerInterval = setInterval(() => {
    seconds++;
    let minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    let sec = (seconds % 60).toString().padStart(2, '0');
    callTimer.textContent = `${minutes}:${sec}`;
  }, 1000);
}

function startCallTimer() {
  let seconds = 0;
  callTimer = document.getElementById('call-timer');
  
  timerInterval = setInterval(() => {
    seconds++;
    let minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    let sec = (seconds % 60).toString().padStart(2, '0');
    callTimer.textContent = `${minutes}:${sec}`;
  }, 1000);
}


// End the call
function endCall() {
  clearInterval(timerInterval);
  document.getElementById('phone-screen').classList.add('hidden');
  document.getElementById('call-timer').classList.add('hidden');
  callTimer.textContent = "00:00";
}
