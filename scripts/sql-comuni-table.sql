-- SQL per creare la tabella comuni su Supabase
-- Esegui questo SQL nel SQL Editor di Supabase Dashboard

CREATE TABLE comuni (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  provincia VARCHAR(2) NOT NULL,
  codice_comune VARCHAR(4) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(nome, provincia)
);

-- Indici per performance
CREATE INDEX idx_comuni_nome ON comuni(nome);
CREATE INDEX idx_comuni_codice ON comuni(codice_comune);

-- Inserisci i dati iniziali
INSERT INTO comuni (nome, provincia, codice_comune) VALUES
('ALESSANDRIA', 'AL', 'A182'),
('MILANO', 'MI', 'F205'),
('ROMA', 'RM', 'H501'),
('TORINO', 'TO', 'L219'),
('NAPOLI', 'NA', 'F839'),
('GENOVA', 'GE', 'D969'),
('BOLOGNA', 'BO', 'A944'),
('FIRENZE', 'FI', 'D612'),
('VENEZIA', 'VE', 'L736'),
('PALERMO', 'PA', 'G273'); 