// função para reserva do armário, incluindo as regras.
function reservarArmario() {
  
    // Obter tipo de armário selecionado pelo usuário no HTML.
    let tipoSelecionado = document.getElementById("tipoArmario").value;
    
    // Filtrar apenas os armários que estão disponíveis e são acessíveis ao usuário.
    let armariosDisponiveis = armarios.filter(a => a.formato === tipoSelecionado && a.status === true && usuario.acessibilidade === a.acessivel);
    
    // Caso não exista armário disponível, retorna mensagem para o usuário.
    if (armariosDisponiveis.length === 0) {
      document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
      return;
    }
    
    // Caso exista armário(s) disponível(is), sorteamos um.
    let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];
    
    // Obter a data e hora atual.
    let dataReserva = new Date();
    
    // Calcular a data e hora de entrega (prazo de 24 horas).
    let prazoEntrega = new Date(dataReserva.getTime() + 24 * 60 * 60 * 1000);  // 24 horas em milissegundos.
    
    // Encontrar o armário sorteado e alterar seu status para 'false'.
    let armarioIndex = armarios.findIndex(armario => armario.id === armarioSorteado.id);
    if (armarioIndex !== -1) {
      // Registrar a data e hora da reserva e a data de entrega no objeto armário.
      armarios[armarioIndex].status = false;
      armarios[armarioIndex].dataReserva = dataReserva;  // Data e hora da reserva.
      armarios[armarioIndex].dataEntrega = prazoEntrega;  // Data e hora para entrega das chaves.
    }
    
    // Atualizar a pendência do usuário.
    usuario.pendencia = true;
    
    // Formatar as datas para exibição.
    let dataReservaFormatada = dataReserva.toLocaleString();
    let dataEntregaFormatada = prazoEntrega.toLocaleString();
    
    // Exibir a mensagem de sucesso e data de entrega.
    document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! O armário ${armarioSorteado.id} foi reservado com sucesso! 
    A data e hora para entrega das chaves será: ${dataEntregaFormatada}.`;
  
    console.log(usuario);
    console.log(armarios);
  }
  
  