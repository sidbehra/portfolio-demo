// src/App.jsx
import React, { useState } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

/* ─── THEMES & GLOBAL ──────────────────────────────────────────────────────── */
const lightTheme = {
  colors: {
    primary:    '#4A90E2',
    secondary:  '#50E3C2',
    accent:     '#9013FE',
    background: '#F5F7FA',
    text:       '#333333',
    modalBg:    'rgba(0,0,0,0.8)',
  },
  fonts: { main: `'Segoe UI', Roboto, sans-serif` },
};
const darkTheme = {
  colors: {
    primary:    '#1E1E2F',
    secondary:  '#3E3E5E',
    accent:     '#FF5768',
    background: '#12121B',
    text:       '#E0E0E0',
    modalBg:    'rgba(255,255,255,0.1)',
  },
  fonts: { main: `'Segoe UI', Roboto, sans-serif` },
};

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.main};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
  }
  a { text-decoration: none; color: inherit; }
  img { max-width: 100%; display: block; }
`;

/* ─── REUSABLE & LAYOUT ───────────────────────────────────────────────────── */
const Section = styled.section`
  padding: ${({ pads }) => pads || '4rem 2rem'};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  background: ${({ bg }) => bg || 'transparent'};
`;

/* ─── NAVBAR w/ THEME TOGGLE ───────────────────────────────────────────────── */
const Nav = styled.nav`
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
  display: flex; justify-content: space-between; align-items: center;
`;
const Logo = styled.div`
  color: white; font-weight: bold; font-size: 1.2rem;
`;
const Menu = styled.ul`
  list-style: none; display: flex; gap: 1.5rem;
  li { color: white; cursor: pointer; }
`;
const Toggle = styled.button`
  margin-left: 1rem;
  background: none; border: 2px solid white; border-radius: 4px;
  color: white; padding: 0.25rem 0.5rem; cursor: pointer;
  font-size: 0.9rem;
`;

/* ─── HERO ─────────────────────────────────────────────────────────────────── */
const HeroSection = styled(Section)`
  min-height: 80vh;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  color: white; text-align: center;
`;
const Title    = styled.h1` font-size: 3rem; margin: 0.5rem 0; `;
const Subtitle = styled.p` font-size: 1.25rem; max-width: 600px; `;
const CTA      = styled.button`
  margin-top: 2rem; padding: 0.75rem 1.5rem; font-size: 1rem;
  background: ${({ theme }) => theme.colors.accent}; border: none; border-radius: 4px;
  color: white; cursor: pointer; transition: transform .2s;
  &:hover { transform: scale(1.05); }
`;

/* ─── ABOUT ────────────────────────────────────────────────────────────────── */
const Heading  = styled.h2` color: ${({ theme }) => theme.colors.primary}; margin-bottom: 1rem; `;
const Text     = styled.p` margin-bottom: 1rem; `;

/* ─── PROJECTS GRID & CARD ────────────────────────────────────────────────── */
const Grid     = styled.div`
  display: grid; gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;
const Card     = styled.div`
  position: relative;
  border: 1px solid #ddd; border-radius: 8px; overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1); cursor: pointer;
  transition: transform .2s;
  &:hover { transform: translateY(-5px); }
`;
const Img      = styled.img` height: 160px; object-fit: cover; `;
const Content  = styled.div` padding: 1rem; `;
const ProjTitle= styled.h3`
  margin: 0 0 .5rem 0; color: ${({ theme }) => theme.colors.secondary};
`;
const Desc     = styled.p` font-size: .9rem; `;

/* ─── MODAL ────────────────────────────────────────────────────────────────── */
const ModalBackdrop = styled.div`
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: ${({ theme }) => theme.colors.modalBg};
  display: flex; justify-content: center; align-items: center;
`;
const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 2rem; border-radius: 8px; max-width: 500px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2); position: relative;
`;
const CloseBtn = styled.button`
  position: absolute; top: 0.5rem; right: 0.5rem;
  background: none; border: none; font-size: 1.5rem; cursor: pointer;
`;

/* ─── CONTACT & FOOTER ─────────────────────────────────────────────────────── */
const LinkButton = styled.a`
  display: inline-block; margin: .5rem;
  padding: .75rem 1.5rem; border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: 4px; color: ${({ theme }) => theme.colors.accent};
  transition: background .2s, color .2s;
  &:hover { background: ${({ theme }) => theme.colors.accent}; color: white; }
`;
const Foot = styled.footer`
  padding: 1.5rem 2rem; text-align: center;
  background: ${({ theme }) => theme.colors.primary}; color: white;
`;

const projects = [
  { title: 'Project One', img: 'https://via.placeholder.com/400x300', desc: 'A React app demonstrating cool UI tricks.' },
  { title: 'Project Two', img: 'https://via.placeholder.com/400x300', desc: 'CSS-art experiments—pixels got nothing on me.' },
  { title: 'Project Three', img: 'https://via.placeholder.com/400x300', desc: 'A Vite-powered dashboard with real-time data.' },
];

/* ─── APP ──────────────────────────────────────────────────────────────────── */
export default function App() {
  const [theme, setTheme]     = useState('light');
  const [selectedProject, setSelectedProject] = useState(null);

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyle />

        {/* NAVBAR */}
        <Nav>
          <Logo>Siddharth</Logo>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Menu>
              {['Home','About','Projects','Contact'].map(i => <li key={i}>{i}</li>)}
            </Menu>
            <Toggle onClick={toggleTheme}>
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </Toggle>
          </div>
        </Nav>

        {/* HERO */}
        <HeroSection>
          <Title>Hi, I’m Siddharth</Title>
          <Subtitle>Front-end wizard crafting sleek interfaces and delightful UX.</Subtitle>
          <CTA onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
            View My Work
          </CTA>
        </HeroSection>

        {/* ABOUT */}
        <Section id="about" center>
          <Heading>About Me</Heading>
          <Text>Passionate front-end dev with a knack for React, Vite, and the occasional CSS art obsession.</Text>
          <Text>When I’m not coding, I'm lost in sci-fi or testing the limits of flexbox.</Text>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" bg="white">
          <Heading>Projects</Heading>
          <Grid>
            {projects.map(p => (
              <Card key={p.title} onClick={() => setSelectedProject(p)}>
                <Img src={p.img} alt={p.title} />
                <Content>
                  <ProjTitle>{p.title}</ProjTitle>
                  <Desc>{p.desc}</Desc>
                </Content>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* PROJECT MODAL */}
        {selectedProject && (
          <ModalBackdrop onClick={() => setSelectedProject(null)}>
            <ModalContent onClick={e => e.stopPropagation()}>
              <CloseBtn onClick={() => setSelectedProject(null)}>×</CloseBtn>
              <h2>{selectedProject.title}</h2>
              <img src={selectedProject.img} alt={selectedProject.title} />
              <p>{selectedProject.desc}</p>
              <p>More details about this project could go here…</p>
            </ModalContent>
          </ModalBackdrop>
        )}

        {/* CONTACT */}
        <Section id="contact" center>
          <Heading>Let’s Chat</Heading>
          <p>Hit me up:</p>
          <LinkButton href="mailto:you@example.com">Email Me</LinkButton>
          <LinkButton href="https://github.com/yourusername" target="_blank" rel="noopener">
            GitHub
          </LinkButton>
          <LinkButton href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener">
            LinkedIn
          </LinkButton>
        </Section>

        {/* FOOTER */}
        <Foot>© {new Date().getFullYear()} Siddharth. Built with ♥ and React.</Foot>
      </>
    </ThemeProvider>
  );
}