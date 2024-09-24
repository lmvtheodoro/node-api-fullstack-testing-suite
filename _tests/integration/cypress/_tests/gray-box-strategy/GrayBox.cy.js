describe('Google Search', () => {
    it('should open Google and verify the title', () => {
      cy.visit('https://www.google.com');
      cy.title().should('include', 'Google'); // Verifica se o título contém "Google"
    });
});  