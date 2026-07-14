export const destinosLista = [
  { name: 'Taxco', region: 'Guerrero', lat: 18.5545, lng: -99.6081 },
  { name: 'Acapulco', region: 'Guerrero', lat: 16.8634, lng: -99.8837 },
  { name: 'Chilapa', region: 'Guerrero', lat: 17.5667, lng: -99.1833 },
  { name: 'Chalma', region: 'Edo. Méx.', lat: 18.7724, lng: -99.5078 },
  { name: 'Malinalco', region: 'Edo. Méx.', lat: 18.9614, lng: -99.5033 },
  { name: 'Nevado de Toluca', region: 'Edo. Méx.', lat: 19.1097, lng: -99.7594 },
  { name: 'Mil Cascadas', region: 'Guerrero', lat: 17.4833, lng: -99.0167 },
  { name: 'Grutas Cacahuamilpa', region: 'Guerrero', lat: 17.8583, lng: -99.3667 },
  { name: 'Las Huertas', region: 'Morelos', lat: 18.8264, lng: -99.0842 },
  { name: 'Cuernavaca', region: 'Morelos', lat: 18.9212, lng: -99.2411 },
  { name: 'Alpuyeca', region: 'Morelos', lat: 18.7833, lng: -99.1833 },
  { name: 'Miacatlán', region: 'Morelos', lat: 18.7436, lng: -99.2539 },
  { name: 'Zacatepec', region: 'Morelos', lat: 18.6333, lng: -99.3833 },
  { name: 'Ciudad de México', region: 'CDMX', lat: 19.4326, lng: -99.1332 },
  { name: 'Basílica de Guadalupe', region: 'CDMX', lat: 19.4838, lng: -99.1267 },
  { name: 'Xochimilco', region: 'CDMX', lat: 19.2782, lng: -99.0789 },
  { name: 'Chapultepec', region: 'CDMX', lat: 19.4161, lng: -99.1834 },
  { name: 'Benito Juárez (Aeropuerto)', region: 'CDMX', lat: 19.4361, lng: -99.0724 },
  { name: 'AIFA (Aeropuerto)', region: 'Edo. Méx.', lat: 19.7456, lng: -99.0155 },
  { name: 'Atlixco', region: 'Puebla', lat: 18.9506, lng: -98.2432 },
  { name: 'Sierra Gorda de Querétaro', region: 'Querétaro', lat: 20.8, lng: -99.5 },
  { name: 'Jojutla', region: 'Morelos', lat: 18.5633, lng: -99.2833 },
  { name: 'Temixco', region: 'Morelos', lat: 18.8833, lng: -99.2333 },
  { name: 'Coatlán del Río', region: 'Morelos', lat: 18.8542, lng: -99.3333 },
  { name: 'Tetecala', region: 'Morelos', lat: 18.8833, lng: -99.1667 },
  { name: 'Mazatepec', region: 'Morelos', lat: 18.85, lng: -99.2833 },
  { name: 'El Rodeo', region: 'Morelos', lat: 18.8167, lng: -99.35 }
]

import imgTaxco from '../assets/galeria/taxco.jpg'
import imgAcapulco from '../assets/galeria/acapulco.jpg'
import imgCuernavaca from '../assets/galeria/cuernavaca.jpg'
import imgNevado from '../assets/galeria/nevado-toluca.jpg'
import imgGrutas from '../assets/galeria/grutas-cacahuamilpa.jpg'
import imgCdmx from '../assets/galeria/cdmx.jpg'
import imgMilCascadas from '../assets/galeria/mil-cascadas.jpg'
import imgMalinalco from '../assets/galeria/malinalco.jpg'

export const galeria = [
  { name: 'Taxco', region: 'Guerrero', img: imgTaxco },
  { name: 'Acapulco', region: 'Guerrero', img: imgAcapulco },
  { name: 'Cuernavaca', region: 'Morelos', img: imgCuernavaca },
  { name: 'Nevado de Toluca', region: 'Estado de México', img: imgNevado },
  { name: 'Grutas de Cacahuamilpa', region: 'Guerrero', img: imgGrutas },
  { name: 'Ciudad de México', region: 'CDMX', img: imgCdmx },
  { name: 'Mil Cascadas', region: 'Guerrero', img: imgMilCascadas },
  { name: 'Malinalco', region: 'Estado de México', img: imgMalinalco }
]

export const filtros = ['all', 'Morelos', 'Guerrero', 'Edo. Méx.', 'CDMX', 'Puebla', 'Querétaro']
