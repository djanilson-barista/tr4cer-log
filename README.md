# 🚀 Instalação da Extensão em Modo Desenvolvedor (Chrome)

Este guia explica como instalar e rodar a extensão em **modo desenvolvedor** no Google Chrome.

---

## 📌 Passo 1: Baixar a Extensão

1. Acesse a página de releases do repositório:  
   🔗 [Tr4cer Log - Releases](https://github.com/djanilson-barista/tr4cer-log/releases)
2. Baixe o arquivo **.zip** da versão mais recente.
3. Extraia o conteúdo do arquivo **.zip** para uma pasta local.

---

## 🛠️ Passo 2: Abrir o Gerenciador de Extensões

1. Abra o **Google Chrome**.
2. Acesse `chrome://extensions/` na barra de endereços.
3. Ative o **Modo Desenvolvedor** no canto superior direito.

---

## 📂 Passo 3: Carregar a Extensão

1. Clique em **"Carregar sem compactação"**.
2. Selecione a pasta onde está o projeto da extensão (**onde o `manifest.json` está localizado**).
3. A extensão será carregada e aparecerá na lista de extensões ativas.

Caso precise **atualizar a extensão**, clique no botão **"Atualizar"** dentro da página `chrome://extensions/`.

---

## ✅ Passo 4: Testar a Extensão

- Certifique-se que sua aplicação está disparando logs com `>> LOG` ou `>> DEV TRACK`;
- Se a extensão tiver um ícone na barra de ferramentas, clique nele para abrir o popup.
- Se houver problemas, verifique os logs no **Console do DevTools**:
  - Acesse `chrome://extensions/`.
  - Clique em **"Fundamentos"** abaixo do nome da extensão.
  - Veja os logs na aba **"Console"**.

---

## 🔄 Atualizando a Extensão

Se precisar atualizar o código da extensão, siga estes passos:

1. Faça as mudanças no código.
2. Vá até `chrome://extensions/`.
3. Clique no botão **"Atualizar"**.
4. Recarregue a página onde a extensão está ativa.

---

## ⚠️ Possíveis Problemas e Soluções

### ❌ **Erro: "Access to script at 'file://' has been blocked by CORS policy"**

🔹 Solução: Certifique-se de que está carregando a extensão corretamente através do **chrome://extensions/** e não abrindo os arquivos diretamente.

### ❌ **Erro: "A extensão não carrega"**

🔹 Solução: Verifique se o `manifest.json` está correto e se todos os arquivos referenciados existem.

### ❌ **Mudanças no código não aparecem**

🔹 Solução: Sempre clique em **"Atualizar"** em `chrome://extensions/` após modificar o código.

---

## 🎯 Conclusão

Agora sua extensão está instalada e pronta para testes! 🚀
Caso tenha dúvidas, entre em contato com o time de desenvolvimento.

---

📌 **Criado por [Djanilson Alves](https://www.linkedin.com/in/djanilsonalves/)**

