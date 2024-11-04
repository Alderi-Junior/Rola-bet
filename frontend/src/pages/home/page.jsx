import React, { useEffect, useState } from 'react';
import styles from './page.module.css'
import { Link } from 'react-router-dom';


export default function Homer() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchLiveMatches = async () => {
      try {
        const response = await fetch(
          `https://v3.football.api-sports.io/fixtures?live=all`,
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
        console.error('Erro ao buscar os jogos ao vivo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveMatches();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* Cabeçalho da Tabela */}
        <thead >
          <tr>
            <th>#</th>
            <th>Times</th>
            <th>Tempo</th>
            <th>Placar</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapeamento dos Jogos */}
          {matches.length > 0 ? (
            matches.map((match, index) => (
              <tr key={match.fixture.id} className={index % 2 === 0 ? "bg-base-200" : ""}>
                <th>{index + 1}</th>
               <button className="btn btn-outline btn-success">Bet</button>
                <td>{match.teams.home.name} vs {match.teams.away.name}</td>
                <td>
                  {match.fixture.status.short === "1H" && "Primeiro Tempo"}
                  {match.fixture.status.short === "2H" && "Segundo Tempo"}{" "}
                  ({match.fixture.status.elapsed} minutos)
                </td>
                <td>{match.goals.home} - {match.goals.away}</td>
                <td>{new Date(match.fixture.date).toLocaleDateString()}</td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">Nenhum jogo ao vivo no momento</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
