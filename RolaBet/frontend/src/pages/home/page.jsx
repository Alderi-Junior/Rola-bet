import React, { useEffect, useState } from 'react';

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState(null); 

  const startDate = new Date();
  startDate.setDate(1);
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(0);

  const startDateString = startDate.toISOString().split('T')[0];
  const endDateString = endDate.toISOString().split('T')[0];

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(
          `https://v3.football.api-sports.io/fixtures?season=2024&league=39&from=${startDateString}&to=${endDateString}`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-host': 'v3.football.api-sports.io',
              'x-rapidapi-key': 'c1a21bf133f47942c1818b2a33e177c4'
            }
          }
        );

        console.log("Status da resposta:", response.status);

        if (response.ok) {
          const data = await response.json();
          setApiData(data); 
          console.log("Dados completos da API:", data);

          if (data && data.response) {
            setMatches(data.response);
          } else {
            console.error("Estrutura inesperada de dados:", data);
          }
        } else {
          console.error("Erro na resposta da API:", response.status, response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar os jogos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
      {matches.slice(0, 9).map((match) => (
        <div key={match.fixture.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
          <h3>{match.teams.home.name} vs {match.teams.away.name}</h3>
          <p><strong>Data:</strong> {new Date(match.fixture.date).toLocaleDateString()}</p>
          <p><strong>Estádio:</strong> {match.fixture.venue.name}, {match.fixture.venue.city}</p>
          <p><strong>Placar:</strong> {match.goals.home} - {match.goals.away}</p>
        </div>
      ))}
    </div>
  );
}





/*
export default function Home(){
    return(
        <h1>Home</h1>
    )

}*/