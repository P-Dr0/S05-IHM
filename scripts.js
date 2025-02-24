// objeto do usuário
const usuario = { nome: "Raphael", matricula: "123456", pendencia: false, acessibilidade: true };

// lista objetos de armários
const armarios = [
  { id: 1, formato: "padrao", status: true, acessivel: false, dataReserva: null, dataEntrega: null },
  { id: 2, formato: "padrao", status: true, acessivel: false, dataReserva: null, dataEntrega: null },
  { id: 3, formato: "padrao", status: true, acessivel: false, dataReserva: null, dataEntrega: null },
  { id: 4, formato: "padrao", status: false, acessivel: true, dataReserva: null, dataEntrega: null },
  { id: 5, formato: "padrao", status: false, acessivel: true, dataReserva: null, dataEntrega: null },
  { id: 6, formato: "duplo", status: true, acessivel: true, dataReserva: null, dataEntrega: null },
  { id: 7, formato: "duplo", status: false, acessivel: true, dataReserva: null, dataEntrega: null },
  { id: 8, formato: "duplo", status: false, acessivel: true, dataReserva: null, dataEntrega: null },  
];

// função para reserva do armário, incluindo as regras.
function reservarArmario() {
  
  // obter tipo de armário selecionado pelo usuário no html.
  let tipoSelecionado = document.getElementById("tipoArmario").value;
  
  // na lista, filtrar apenas os armários que estão disponíveis e que são acessiveis ao usuário.
  let armariosDisponiveis = armarios.filter(a => a.formato === tipoSelecionado && a.status === true && usuario.acessibilidade === a.acessivel);
  
  // caso não exista armário disponível, retorna para o usuário mensagem.
  if (armariosDisponiveis.length === 0) {
    document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
    return;
  }
  
  // Caso exista armário(s) disponível, seguimos sorteando uma opção. 
  let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];
  
  // Alterando diretamente o status do armário no array
  let armarioIndex = armarios.findIndex(armario => armario.id === armarioSorteado.id);
  armarios[armarioIndex].status = false;
  
  // Registrando a data e hora de reserva
  const dataReserva = new Date();
  armarios[armarioIndex].dataReserva = dataReserva;
  
  // Calculando a data e hora para entrega das chaves (24 horas após a reserva)
  const dataEntrega = new Date(dataReserva.getTime() + 24 * 60 * 60 * 1000);  // Adiciona 24 horas em milissegundos
  armarios[armarioIndex].dataEntrega = dataEntrega;
  
  // Mudamos a pendência do usuário para verdadeira.
  usuario.pendencia = true;
  
  // Formatando as datas para exibição
  const dataReservaFormatada = dataReserva.toLocaleString('pt-BR', { hour12: false });
  const dataEntregaFormatada = dataEntrega.toLocaleString('pt-BR', { hour12: false });
  
  // Exibindo a mensagem de sucesso com a data e hora de entrega
  document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! O armário ${armarioSorteado.id} foi reservado com sucesso!\n
    A reserva foi realizada em: ${dataReservaFormatada}\n
    A entrega das chaves está marcada para: ${dataEntregaFormatada}`;

  // Para fins de depuração, podemos ver as atualizações
  console.log(usuario);
  console.log(armarios);
}

  
  