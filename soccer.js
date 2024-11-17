// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsuy1TJvq9pFhDaqaUjXdZsp2gMU7Iv_Y",
  authDomain: "firestore-query-7bb0d.firebaseapp.com",
  projectId: "firestore-query-7bb0d",
  storageBucket: "firestore-query-7bb0d.firebasestorage.app",
  messagingSenderId: "322306689803",
  appId: "1:322306689803:web:0cb6ceb24a757cebe3f00e",
  measurementId: "G-KW4ESP2QS1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Task 1

const teams = [
  {
    name: "Real Madrid",
    city: "Madrid",
    country: "Spain",
    top_scorers: ["Ronaldo", "Benzema", "Hazard"],
    worldwide_fans: 798,
  },
  {
    name: "Barcelona",
    city: "Barcelona",
    country: "Spain",
    top_scorers: ["Messi", "Suarez", "Puyol"],
    worldwide_fans: 738,
  },
  {
    name: "Manchester United",
    city: "Manchester",
    country: "England",
    top_scorers: ["Cantona", "Rooney", "Ronaldo"],
    worldwide_fans: 755,
  },
  {
    name: "Manchester City",
    city: "Manchester",
    country: "England",
    top_scorers: ["Sterling", "Aguero", "Haaland"],
    worldwide_fans: 537,
  },
  {
    name: "Brazil National Team",
    city: "Not applicable",
    country: "Brazil",
    top_scorers: ["Ronaldinho", "Cafu", "Bebeto"],
    worldwide_fans: 950,
  },
  {
    name: "Argentina National Team",
    city: "Not applicable",
    country: "Argentina",
    top_scorers: ["Messi", "Batistuta", "Maradona"],
    worldwide_fans: 888,
  },
  {
    name: "Atletico Madrid",
    city: "Madrid",
    country: "Spain",
    top_scorers: ["Aragonés", "Griezmann", "Torres"],
    worldwide_fans: 400,
  },
];

const db = getFirestore(app);

// Function to add each team to Firestore if it does not already exist
async function addTeams() {
  const teamsRef = collection(db, "teams");

  for (const team of teams) {
    try {
      // Check if the team already exists based on the team name
      const q = query(teamsRef, where("name", "==", team.name)); // Query using the team name

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // If no existing team found, add the new team
        const docRef = await addDoc(teamsRef, team);
        console.log("Document written with ID: ", docRef.id);
      } else {
        console.log(`Team with name "${team.name}" already exists.`);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

addTeams();

// Task 2

// q1 show all teams in Spain
async function getSpain() {
  const q = query(collection(db, "teams"), where("country", "==", "Spain"));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(`Team Name: ${doc.data().name}, Data:`, doc.data());
  });
}

getSpain();

// q2 teams in Madrid, Spain
async function getMadridSpain() {
  const q = query(
    collection(db, "teams"),
    where("city", "==", "Madrid"),
    where("country", "==", "Spain")
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(`Team Name: ${doc.data().name}, Data:`, doc.data());
  });
}

getMadridSpain();

// q3 all national teams

async function getNationalTeams() {
  const q = query(
    collection(db, "teams"),
    where("city", "==", "Not applicable")
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(`Team Name: ${doc.data().name}, Data:`, doc.data());
  });
}

getNationalTeams();

// q4 teams not in Spain

async function getNotSpain() {
  const q = query(collection(db, "teams"), where("country", "!=", "Spain"));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(`Team Name: ${doc.data().name}, Data:`, doc.data());
  });
}

getNotSpain();

// q5 teams not Spain or England

async function getNotSpainOrEngland() {
  const q = query(
    collection(db, "teams"),
    where("country", "!=", "Spain"),
    where("country", "!=", "England")
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(`Team Name: ${doc.data().name}, Data:`, doc.data());
  });
}

getSpain();

//q6 Spain more than 700M fans

async function getSpainMoreThan700MFans() {
  const q = query(
    collection(db, "teams"),
    where("country", "==", "Spain"),
    where("worldwide_fans", ">", 700)
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(`Team Name: ${doc.data().name}, Data:`, doc.data());
  });
}

getSpainMoreThan700MFans();

// q7 teams with fans in range of 500M and 600M

async function getFansBetween500MAnd600M() {
  const q = query(
    collection(db, "teams"),
    where("worldwide_fans", ">=", 500),
    where("worldwide_fans", "<=", 600)
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(`Team Name: ${doc.data().name}, Data:`, doc.data());
  });
}

getFansBetween500MAnd600M();

// q8 Ronaldo Top Scorer

async function getRonaldoScorer() {
  const q = query(
    collection(db, "teams"),
    where("top_scorer", "array-contains", "Ronaldo")
  );
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log("Team Name:", doc.data().name, "Data:", doc.data());
    });
  } catch (error) {
    console.error("Error getting teams with Ronaldo:", error);
  }
}

getRonaldoScorer();

// q9 Ronaldo, Maradona, or Messi top scorer

async function getTopScorers() {
  const q = query(
    collection(db, "teams"),
    where("top_scorers", "array-contains-any", ["Ronaldo", "Maradona", "Messi"])
  );

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log("Team Name:", doc.data().name, "Data:", doc.data());
    });
  } catch (error) {
    console.error("Error getting teams with top scorers:", error);
  }
}

getTopScorers();

// Task 3

// a. Updating existing data

async function updateTeams() {
  // Update Real Madrid
  const MadridQuery = query(
    collection(db, "teams"),
    where("name", "==", "Real Madrid")
  );
  const MadridSnapshot = await getDocs(MadridQuery);
  if (!MadridSnapshot.empty) {
    const docRef = MadridSnapshot.docs[0].ref;
    await updateDoc(docRef, {
      name: "Real Madrid FC",
      worldwide_fans: 811,
      top_scorers: arrayRemove("Hazard"),
      top_scorers: arrayUnion("Crispo"),
    });
  }

  // Update Barcelona
  const barceQuery = query(
    collection(db, "teams"),
    where("name", "==", "Barcelona")
  );
  const barceSnapshot = await getDocs(barceQuery);
  if (!barceSnapshot.empty) {
    const docRef = barceSnapshot.docs[0].ref;
    await updateDoc(docRef, {
      name: "FC Barcelona",
      worldwide_fans: 747,
      top_scorers: arrayRemove("Puyol"),
      top_scorers: arrayUnion("Deco"),
    });
  }
}

updateTeams();

// Add new fields to existing documents: update jersey colors

async function updateJersey() {
  const MadridQuery = query(
    collection(db, "teams"),
    where("name", "==", "Real Madrid FC")
  );
  const MadridSnapshot = await getDocs(MadridQuery);
  if (!MadridSnapshot.empty) {
    const docRef = MadridSnapshot.docs[0].ref;
    await updateDoc(docRef, {
      color: {
        home: "White",
        away: "Black",
      },
    });

    await updateDoc(docRef, {
      "color.away": "Purple",
    });
  }

  const barceQuery = query(
    collection(db, "teams"),
    where("name", "==", "FC Barcelona")
  );
  const barceSnapshot = await getDocs(barceQuery);
  if (!barceSnapshot.empty) {
    const docRef = barceSnapshot.docs[0].ref;
    await updateDoc(docRef, {
      color: {
        home: "Red",
        away: "Gold",
      },
    });

    await updateDoc(docRef, {
      "color.away": "Pink",
    });
  }
}

updateJersey();
