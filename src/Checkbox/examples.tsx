import { storiesOf } from '@storybook/react';
import React from 'react';
import { Checkbox } from '.';
import { Box } from '../Box';
import { Button } from '../Button';
import { CheckboxGroup } from '../CheckboxGroup';
import { Form } from '../Form';
import { FormErrorMessage } from '../FormErrorMessage';
import { Text } from '../Text';

const stories = storiesOf('Checkbox', module);

stories.addDecorator(story => {
    return (
        <Box maxWidth="lg" mx="auto" mt={6} p={6}>
            {story()}
        </Box>
    );
});

stories.add('Default', () => (
    <>
        <CheckboxGroup>
            <Checkbox variantColor="pink" isFullWidth defaultIsChecked>
                Checkbox 1
            </Checkbox>
            <Checkbox isInvalid>Checkbox 2</Checkbox>
            <FormErrorMessage
                //  isInvalid
                id="err"
            >
                This is not valid
            </FormErrorMessage>
        </CheckboxGroup>

        <CheckboxGroup>
            <Checkbox isDisabled>Disabled </Checkbox>
            <Checkbox isChecked isDisabled>
                Disabled and checked
            </Checkbox>
        </CheckboxGroup>
    </>
));

stories.add('disabled checkbox', () => (
    <CheckboxGroup>
        <Checkbox isDisabled>Disabled </Checkbox>
        <Checkbox isChecked isDisabled>
            Disabled and checked
        </Checkbox>
    </CheckboxGroup>
));

stories.add('readonly checkbox', () => (
    <CheckboxGroup>
        <Checkbox isReadOnly>Readonly</Checkbox>
        <Checkbox isChecked isReadOnly>
            Readonly and checked
        </Checkbox>
    </CheckboxGroup>
));

function IndeterminateExample() {
    const [checkedItems, setCheckedItems] = React.useState([]);

    // Children
    const childNames = ['child1', 'child2'];

    // Parent
    const parentName = 'parent';
    const allChecked = checkedItems.every(String) && checkedItems.length === childNames.length;
    const isIndeterminate = checkedItems.some(String) && !allChecked;

    return (
        <CheckboxGroup value={checkedItems} onChange={newVals => setCheckedItems(newVals)}>
            <Checkbox
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={e => {
                    setCheckedItems(e.target.checked ? childNames : []);
                }}
                name={parentName}
            >
                Parent Checkbox
            </Checkbox>
            <Checkbox name={childNames[0]} isChild>
                Child Checkbox 1
            </Checkbox>
            <Checkbox name={childNames[1]} isChild>
                Child Checkbox 2
            </Checkbox>
        </CheckboxGroup>
    );
}

stories.add('indeterminate checkbox', () => <IndeterminateExample />);

stories.add('(Form) - Parent key', () => {
    return (
        <Form
            onSubmit={(e, { getFormValue }) => {
                e.preventDefault();
                console.log(getFormValue());
            }}
        >
            <Text>Checkbox values will be contained within a single form key array.</Text>
            <CheckboxGroup name="flavors">
                <Checkbox name="chocolate">Chocolate</Checkbox>
                <Checkbox name="vanilla">Vanilla</Checkbox>
            </CheckboxGroup>
            <Button type="submit">submit</Button>
        </Form>
    );
});

stories.add('(Form) - Individual keys', () => (
    <Form
        onSubmit={(e, { getFormValue }) => {
            e.preventDefault();
            console.log(getFormValue());
        }}
    >
        <Text>Checkbox values will each have their own key.</Text>
        <CheckboxGroup>
            <Checkbox name="chocolate">Chocolate</Checkbox>
            <Checkbox name="vanilla">Vanilla</Checkbox>
        </CheckboxGroup>
        <Button type="submit">submit</Button>
    </Form>
));
