import React from 'react';
import { Plus, Trash, Asterisk, CaretDown } from "@phosphor-icons/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Badge } from "~/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible";
import { JSONSchema7 } from 'json-schema';
import { useDocumentContext } from '~/contexts/document-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";

type DefaultValues = {
  string: string;
  number: number;
  boolean: boolean;
  array: any[];
  object: Record<string, any>;
};

const defaultValues: DefaultValues = {
  string: "",
  number: 0,
  boolean: false,
  array: [],
  object: {},
};

const createNewListValue = (itemSchema: JSONSchema7): Record<string, any> => {
  const newObj: Record<string, any> = {};
  if (itemSchema.properties) {
    Object.entries(itemSchema.properties).forEach(([key, property]) => {
      if (typeof property !== 'boolean') {
        newObj[key] = defaultValues[property.type as keyof DefaultValues];
      }
    });
  }
  return newObj;
};

interface ContextVariableInputProps {
  schema: JSONSchema7;
  path: string;
  indentLevel?: number;
  listIndex?: number;
  onDelete?: () => void;
  isRequired?: boolean;
  isLast?: boolean;
}

const ContextVariableInput: React.FC<ContextVariableInputProps> = ({
  schema,
  path,
  indentLevel = 0,
  listIndex,
  onDelete,
  isRequired = false,
  isLast = false,
}) => {
  const { documentContext, updateDocumentContext } = useDocumentContext();
  const [isOpen, setIsOpen] = React.useState(true);

  const updateValue = (newValue: any) => {
    updateDocumentContext(path, newValue);
  };

  const value = path.split('.').reduce((acc, part) => acc && acc[part], documentContext);

  const renderScalarInput = () => {
    switch (schema.type) {
      case "string":
        return (
          <Input
            type="text"
            value={value || ""}
            onChange={(e) => updateValue(e.target.value)}
            className="h-8 w-full"
          />
        );
      case "number":
      case "integer":
        return (
          <Input
            type="number"
            value={value || 0}
            onChange={(e) => updateValue(Number(e.target.value))}
            className="h-8 w-full"
          />
        );
      case "boolean":
        return (
          <Switch
            checked={value || false}
            onCheckedChange={(checked) => updateValue(checked)}
          />
        );
      default:
        return null;
    }
  };

  const renderObjectItems = () => {
    if (!schema.properties) return null;
    const requiredFields = schema.required as string[] | undefined;
    const entries = Object.entries(schema.properties)
      .sort((a, b) => a[0].localeCompare(b[0]));
    return entries.map(([key, property], index) => {
      if (typeof property === 'boolean') return null;
      return (
        <ContextVariableInput
          key={key}
          schema={property}
          path={`${path}.${key}`}
          indentLevel={indentLevel + 1}
          isRequired={requiredFields?.includes(key)}
          isLast={index === entries.length - 1}
        />
      );
    });
  };

  const renderArrayItems = () => {
    if (!schema.items) return null;
    
    let itemSchema: JSONSchema7;
    if (Array.isArray(schema.items)) {
      itemSchema = schema.items[0] as JSONSchema7;
    } else if (typeof schema.items === 'object') {
      itemSchema = schema.items;
    } else {
      return null;
    }

    return (
      <div className="flex flex-col relative">
        {Array.isArray(value) && value.map((item: any, index: number) => (
          <ContextVariableInput
            key={index}
            schema={itemSchema}
            path={`${path}.${index}`}
            indentLevel={indentLevel + 1}
            listIndex={index}
            onDelete={() => {
              const newValue = [...value];
              newValue.splice(index, 1);
              updateValue(newValue);
            }}
            isRequired={true}
            isLast={false}
          />
        ))}
        <div className="relative">
          {indentLevel > 0 && (
            <div
              className="absolute left-0 top-0 bottom-0 border-l-2 border-muted"
              style={{ left: `${indentLevel * 1}rem` }}
            />
          )}
          <div
            className="absolute left-0 top-1/2 w-2 border-t-2 border-muted"
            style={{ left: `${indentLevel * 1}rem` }}
          />
          <div
            className="absolute left-0 top-0 bottom-1/2 border-l-2 border-muted"
            style={{ left: `${indentLevel * 1}rem` }}
          />
          <Button
            variant="ghost"
            size="sm"
            className="w-fit relative"
            style={{ marginLeft: `${(indentLevel + 1) * 1}rem` }}
            onClick={() => updateValue([...(value || []), createNewListValue(itemSchema)])}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add item
          </Button>
        </div>
      </div>
    );
  };

  const renderCollapsibleContent = () => {
    if (schema.type === "object") {
      return (
        <div className="-ml-2">
          {renderObjectItems()}
        </div>
      );
    } else if (schema.type === "array") {
      return (
        <div className="-ml-2">
          {renderArrayItems()}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col relative">
      {indentLevel > 0 && (
        <div
          className="absolute left-0 top-0 bottom-0 border-l-2 border-muted"
          style={{ 
            left: `${(indentLevel - 1) * 1}rem`,
            bottom: isLast ? '50%' : '0',
          }}
        />
      )}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between relative py-0.5">
          {indentLevel > 0 && (
            <div
              className="absolute left-0 top-1/2 w-2 border-t-2 border-muted"
              style={{ left: `${(indentLevel - 1) * 1}rem` }}
            />
          )}
          <div
            className="flex items-center gap-1"
            style={{ marginLeft: `${indentLevel * 1}rem` }}
          >
            {(schema.type === "object" || schema.type === "array") && (
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
                  <CaretDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-0' : '-rotate-90'}`} />
                </Button>
              </CollapsibleTrigger>
            )}
            <Label className="text-sm font-medium">
              {path.split('.').pop()}
              {isRequired && (
                <sup>
                  <Asterisk className="inline-block w-2 h-2 ml-0.5 text-muted-foreground" />
                </sup>
              )}
            </Label>
            <Badge variant="secondary" className="text-xs">
              {schema.type as string}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            {schema.type !== "object" && schema.type !== "array" && renderScalarInput()}
            {listIndex !== undefined && onDelete && (
              <Button
                size="icon-sm"
                variant="destructive"
                onClick={onDelete}
              >
                <Trash className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        <CollapsibleContent className="overflow-hidden transition-all duration-300 pl-5 relative">
          {renderCollapsibleContent()}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

const ContextEditor: React.FC = () => {
  const { documentSchema, documentContext } = useDocumentContext();

  const numVars = Object.keys(documentSchema?.properties || {}).length;
  console.log({ documentSchema, documentContext });

  return (
    <div className="flex flex-col gap-2 text-card-foreground">
      {numVars > 0 ? (
        Object.entries(documentSchema?.properties || {})
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([key, variable], index, array) => {
            if (typeof variable === 'boolean') return null;
            return (
              <ContextVariableInput
                key={key}
                schema={variable as JSONSchema7}
                path={`document.${key}`}
                isRequired={documentSchema?.required?.includes(key)}
                isLast={index === array.length - 1}
              />
            );
          })
      ) : (
        <div className="w-full h-36 flex flex-col items-center justify-center">
          <div className="text-gray-500 mb-2">No context variables found.</div>
          <div className="text-gray-500 text-sm text-center">
            Try adding a variable to your code by
            <br /> typing <code>{"{{ message }}"}</code> and come back here
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextEditor;