import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './Button'; 
describe('Componente Button', () => {
  it('Deve renderizar o título corretamente', () => {
    const { getByText } = render(<Button title="Clique Aqui" onPress={() => {}} />);
    

    expect(getByText('Clique Aqui')).toBeTruthy();
  });

  it('Deve chamar a função onPress ao clicar', () => {
    const mockFn = jest.fn();
    const { getByText } = render(<Button title="Testar" onPress={mockFn} />);
    
    fireEvent.press(getByText('Testar'));
    

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});