# Componentes de Formulário do Innerview

Este documento descreve os componentes de formulário disponíveis na aplicação Innerview, suas propriedades e exemplos de uso.

## Índice

- [Form](#form)
- [FormField](#formfield)
- [DateField](#datefield)
- [MultiSelectField](#multiselectfield)
- [FileUploadField](#fileuploadfield)

## Form

O componente `Form` é um container para formulários que fornece funcionalidades de submissão, reset, e exibição de mensagens de erro ou sucesso.

### Propriedades

| Propriedade | Tipo | Obrigatório | Padrão | Descrição |
|-------------|------|-------------|--------|-----------|
| children | ReactNode | Sim | - | Conteúdo do formulário |
| onSubmit | (e: React.FormEvent) => void | Sim | - | Função chamada ao submeter o formulário |
| submitLabel | string | Não | 'Salvar' | Texto do botão de submissão |
| isSubmitting | boolean | Não | false | Se o formulário está sendo submetido |
| error | string | Não | - | Mensagem de erro |
| errorSeverity | 'error' \| 'warning' \| 'info' \| 'success' | Não | 'error' | Severidade do alerta de erro |
| successMessage | string | Não | - | Mensagem de sucesso |
| resetLabel | string \| null | Não | 'Cancelar' | Texto do botão de reset (null para não exibir) |
| onReset | () => void | Não | - | Função chamada ao clicar no botão de reset |
| spacing | number | Não | 2 | Espaçamento entre elementos do formulário |
| disableSubmit | boolean | Não | false | Desativa o botão de submissão |

### Exemplo de Uso

```tsx
import { Form, FormField } from '@/components/ui/form';

const MeuFormulario = () => {
  const [formData, setFormData] = useState({ nome: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Lógica de submissão
      setSuccess('Dados salvos com sucesso!');
    } catch (err) {
      setError('Erro ao salvar dados.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ nome: '' });
    setError('');
    setSuccess('');
  };

  return (
    <Form
      onSubmit={handleSubmit}
      onReset={handleReset}
      isSubmitting={isSubmitting}
      error={error}
      successMessage={success}
      submitLabel="Enviar"
    >
      <FormField
        type="text"
        textFieldProps={{
          label: "Nome",
          name: "nome",
          value: formData.nome,
          onChange: (e) => setFormData({ ...formData, nome: e.target.value }),
        }}
      />
    </Form>
  );
};
```

## FormField

O componente `FormField` é um wrapper para campos de formulário que oferece suporte a diferentes tipos de entrada com gestão de erros consistente.

### Propriedades

As propriedades variam dependendo do tipo de campo:

#### Propriedades Base (comuns a todos os tipos)

| Propriedade | Tipo | Obrigatório | Descrição |
|-------------|------|-------------|-----------|
| error | string | Não | Mensagem de erro |
| touched | boolean | Não | Se o campo foi tocado (para validação) |
| helperText | string | Não | Texto de ajuda exibido abaixo do campo |

#### TextField (type: 'text', 'email', 'password', 'number', 'tel', 'url')

| Propriedade | Tipo | Obrigatório | Descrição |
|-------------|------|-------------|-----------|
| type | 'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url' | Sim | Tipo do campo |
| textFieldProps | TextFieldProps (MUI) | Sim | Propriedades para o TextField do Material UI |

#### SelectField (type: 'select')

| Propriedade | Tipo | Obrigatório | Descrição |
|-------------|------|-------------|-----------|
| type | 'select' | Sim | Tipo do campo |
| name | string | Sim | Nome do campo |
| label | string | Sim | Rótulo do campo |
| value | string | Sim | Valor selecionado |
| options | { value: string; label: string }[] | Sim | Opções do select |
| onChange | (e: SelectChangeEvent) => void | Sim | Função chamada ao mudar o valor |
| required | boolean | Não | Se o campo é obrigatório |
| disabled | boolean | Não | Se o campo está desativado |

#### CheckboxField (type: 'checkbox')

| Propriedade | Tipo | Obrigatório | Descrição |
|-------------|------|-------------|-----------|
| type | 'checkbox' | Sim | Tipo do campo |
| name | string | Sim | Nome do campo |
| label | string | Sim | Rótulo do campo |
| checked | boolean | Sim | Se o checkbox está marcado |
| onChange | (e: React.ChangeEvent<HTMLInputElement>) => void | Sim | Função chamada ao mudar o valor |
| disabled | boolean | Não | Se o campo está desativado |

### Exemplo de Uso

```tsx
import { FormField } from '@/components/ui/form';
import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';

const FormFields = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    tipo: '',
    ativo: false
  });

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData({ ...formData, tipo: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, ativo: e.target.checked });
  };

  return (
    <div>
      <FormField
        type="text"
        textFieldProps={{
          label: "Nome",
          name: "nome",
          value: formData.nome,
          onChange: (e) => setFormData({ ...formData, nome: e.target.value }),
        }}
      />

      <FormField
        type="email"
        textFieldProps={{
          label: "Email",
          name: "email",
          value: formData.email,
          onChange: (e) => setFormData({ ...formData, email: e.target.value }),
        }}
      />

      <FormField
        type="select"
        name="tipo"
        label="Tipo"
        value={formData.tipo}
        onChange={handleSelectChange}
        options={[
          { value: 'admin', label: 'Administrador' },
          { value: 'user', label: 'Usuário' }
        ]}
      />

      <FormField
        type="checkbox"
        name="ativo"
        label="Ativo"
        checked={formData.ativo}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};
```

## DateField

O componente `DateField` oferece um seletor de data com localização em português.

### Propriedades

| Propriedade | Tipo | Obrigatório | Padrão | Descrição |
|-------------|------|-------------|--------|-----------|
| name | string | Sim | - | Nome do campo |
| label | string | Sim | - | Rótulo do campo |
| value | Dayjs \| null | Sim | - | Valor da data |
| onChange | (date: Dayjs \| null) => void | Sim | - | Função chamada ao mudar a data |
| error | string | Não | - | Mensagem de erro |
| touched | boolean | Não | - | Se o campo foi tocado (para validação) |
| helperText | string | Não | - | Texto de ajuda exibido abaixo do campo |
| required | boolean | Não | false | Se o campo é obrigatório |
| disabled | boolean | Não | false | Se o campo está desativado |
| minDate | Dayjs | Não | - | Data mínima selecionável |
| maxDate | Dayjs | Não | - | Data máxima selecionável |
| format | string | Não | 'DD/MM/YYYY' | Formato de exibição da data |
| views | Array<'year' \| 'month' \| 'day'> | Não | ['year', 'month', 'day'] | Visualizações disponíveis |
| disableFuture | boolean | Não | false | Desativa datas futuras |
| disablePast | boolean | Não | false | Desativa datas passadas |

### Exemplo de Uso

```tsx
import { DateField } from '@/components/ui/form';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

const DatePickerExample = () => {
  const [data, setData] = useState<Dayjs | null>(dayjs());

  return (
    <DateField
      name="dataInicio"
      label="Data de Início"
      value={data}
      onChange={(newDate) => setData(newDate)}
      disablePast
      helperText="Selecione uma data futura"
    />
  );
};
```

## MultiSelectField

O componente `MultiSelectField` permite a seleção de múltiplos valores com interface de chips.

### Propriedades

| Propriedade | Tipo | Obrigatório | Padrão | Descrição |
|-------------|------|-------------|--------|-----------|
| name | string | Sim | - | Nome do campo |
| label | string | Sim | - | Rótulo do campo |
| value | string[] | Sim | - | Valores selecionados |
| options | { value: string; label: string }[] | Sim | - | Opções disponíveis |
| onChange | (event: SelectChangeEvent<string[]>) => void | Sim | - | Função chamada ao mudar os valores |
| error | string | Não | - | Mensagem de erro |
| touched | boolean | Não | - | Se o campo foi tocado (para validação) |
| helperText | string | Não | - | Texto de ajuda exibido abaixo do campo |
| required | boolean | Não | false | Se o campo é obrigatório |
| disabled | boolean | Não | false | Se o campo está desativado |
| maxSelections | number | Não | - | Número máximo de seleções permitidas |

### Exemplo de Uso

```tsx
import { MultiSelectField } from '@/components/ui/form';
import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';

const MultiSelectExample = () => {
  const [habilidades, setHabilidades] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setHabilidades(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <MultiSelectField
      name="habilidades"
      label="Habilidades"
      value={habilidades}
      onChange={handleChange}
      options={[
        { value: 'js', label: 'JavaScript' },
        { value: 'ts', label: 'TypeScript' },
        { value: 'react', label: 'React' },
        { value: 'node', label: 'Node.js' }
      ]}
      maxSelections={3}
      helperText="Selecione até 3 habilidades"
    />
  );
};
```

## FileUploadField

O componente `FileUploadField` permite o upload de arquivos com interface drag-and-drop.

### Propriedades

| Propriedade | Tipo | Obrigatório | Padrão | Descrição |
|-------------|------|-------------|--------|-----------|
| name | string | Sim | - | Nome do campo |
| label | string | Sim | - | Rótulo do campo |
| value | File[] | Sim | - | Arquivos selecionados |
| onChange | (files: File[]) => void | Sim | - | Função chamada ao mudar os arquivos |
| error | string | Não | - | Mensagem de erro |
| touched | boolean | Não | - | Se o campo foi tocado (para validação) |
| helperText | string | Não | - | Texto de ajuda exibido abaixo do campo |
| required | boolean | Não | false | Se o campo é obrigatório |
| disabled | boolean | Não | false | Se o campo está desativado |
| accept | string | Não | - | Tipos de arquivo aceitos (ex: 'image/*,.pdf') |
| multiple | boolean | Não | false | Se permite múltiplos arquivos |
| maxFiles | number | Não | 5 | Número máximo de arquivos (se multiple=true) |
| maxSize | number | Não | 5 * 1024 * 1024 | Tamanho máximo do arquivo em bytes (padrão: 5MB) |

### Exemplo de Uso

```tsx
import { FileUploadField } from '@/components/ui/form';
import { useState } from 'react';

const FileUploadExample = () => {
  const [arquivos, setArquivos] = useState<File[]>([]);

  return (
    <FileUploadField
      name="documentos"
      label="Documentos"
      value={arquivos}
      onChange={setArquivos}
      accept=".pdf,.docx,.xlsx"
      multiple
      maxFiles={3}
      maxSize={10 * 1024 * 1024} // 10MB
      helperText="Arraste ou selecione até 3 arquivos (máx 10MB cada)"
    />
  );
};
```

## Importação dos Componentes

Todos os componentes de formulário podem ser importados de uma única localização:

```tsx
import { 
  Form, 
  FormField, 
  DateField, 
  MultiSelectField, 
  FileUploadField 
} from '@/components/ui/form';
```

## Notas de Acessibilidade

Todos os componentes seguem as diretrizes de acessibilidade WCAG 2.2 AA e incluem:

- Atributos aria apropriados
- Suporte a navegação por teclado
- Mensagens de erro claras
- Contraste de cores adequado
- Textos alternativos e descrições para campos 