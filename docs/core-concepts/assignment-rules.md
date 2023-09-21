# Assignment Rules

Assignment Rules in FactryFlow help you automatically assign the right resources to tasks. You set up these rules once, and then the software uses them to make sure each task gets the resources it needs.

## How Do They Work?

Each Assignment Rule uses a resource group as its starting point. You tell the rule how many resources you need from that group for a task. If there are more resources available than needed, the rule picks the most available ones.

## Setting Criteria

You can make each Assignment Rule more specific by adding criteria. These criteria act like filters. They tell the rule which tasks it should focus on.

## Example: Using 'Task Type'

Suppose you create an Assignment Rule and for this rule, you select a resource group of CNC machines. You also specify that you need 2 machines for each task that matches the rule. Then, you set the criteria so that the 'Task Type' must be "Machining." This means the rule will only activate for tasks labeled as "Machining."

When a task comes up that is of the type "Machining," this rule will automatically kick in. It will look at the chosen resource group of CNC machines and pick the two most available machines to work on this specific "Machining" task.

## What If More Than One Rule Fits?

Sometimes, more than one rule might fit a task. Each rule has a priority number. The rule with the highest priority gets to go first and assign the resources.
