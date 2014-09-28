## Usage 

The compiler executes the following phases:

1. Create or initialize a `Program` instance (create).
2. Load and execute library modules (libs).
3. Gather source files to merge with parsed program data (sources).
4. Load and concatenate markdown input files (cat).
5. Parse markdown document to tokens (parse).
6. Render markdown tokens into program definition (render).
