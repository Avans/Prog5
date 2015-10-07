
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 10/06/2015 17:11:33
-- Generated from EDMX file: C:\Users\Linksonder\Documents\1. GitHub\Prog5\Prog5_Opdrachten_Week5\DataLogger\MyModel.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [LeagueOfLedjens];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_TeamPlayer]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Players] DROP CONSTRAINT [FK_TeamPlayer];
GO
IF OBJECT_ID(N'[dbo].[FK_CompetitionTeam_Competition]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[CompetitionTeam] DROP CONSTRAINT [FK_CompetitionTeam_Competition];
GO
IF OBJECT_ID(N'[dbo].[FK_CompetitionTeam_Team]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[CompetitionTeam] DROP CONSTRAINT [FK_CompetitionTeam_Team];
GO
IF OBJECT_ID(N'[dbo].[FK_LadderCompetition]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Competitions] DROP CONSTRAINT [FK_LadderCompetition];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Teams]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Teams];
GO
IF OBJECT_ID(N'[dbo].[Players]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Players];
GO
IF OBJECT_ID(N'[dbo].[Competitions]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Competitions];
GO
IF OBJECT_ID(N'[dbo].[Ladders]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Ladders];
GO
IF OBJECT_ID(N'[dbo].[CompetitionTeam]', 'U') IS NOT NULL
    DROP TABLE [dbo].[CompetitionTeam];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Teams'
CREATE TABLE [dbo].[Teams] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [Ranking] nvarchar(max)  NULL
);
GO

-- Creating table 'Players'
CREATE TABLE [dbo].[Players] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [Gamertag] nvarchar(max)  NOT NULL,
    [TeamId] int  NOT NULL,
    [Role] int  NOT NULL
);
GO

-- Creating table 'Competitions'
CREATE TABLE [dbo].[Competitions] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Date] datetime  NOT NULL,
    [Ladder_Id] int  NULL
);
GO

-- Creating table 'Ladders'
CREATE TABLE [dbo].[Ladders] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Season] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'CompetitionTeam'
CREATE TABLE [dbo].[CompetitionTeam] (
    [Competition_Id] int  NOT NULL,
    [Teams_Id] int  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Teams'
ALTER TABLE [dbo].[Teams]
ADD CONSTRAINT [PK_Teams]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Players'
ALTER TABLE [dbo].[Players]
ADD CONSTRAINT [PK_Players]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Competitions'
ALTER TABLE [dbo].[Competitions]
ADD CONSTRAINT [PK_Competitions]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Ladders'
ALTER TABLE [dbo].[Ladders]
ADD CONSTRAINT [PK_Ladders]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Competition_Id], [Teams_Id] in table 'CompetitionTeam'
ALTER TABLE [dbo].[CompetitionTeam]
ADD CONSTRAINT [PK_CompetitionTeam]
    PRIMARY KEY CLUSTERED ([Competition_Id], [Teams_Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [TeamId] in table 'Players'
ALTER TABLE [dbo].[Players]
ADD CONSTRAINT [FK_TeamPlayer]
    FOREIGN KEY ([TeamId])
    REFERENCES [dbo].[Teams]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_TeamPlayer'
CREATE INDEX [IX_FK_TeamPlayer]
ON [dbo].[Players]
    ([TeamId]);
GO

-- Creating foreign key on [Competition_Id] in table 'CompetitionTeam'
ALTER TABLE [dbo].[CompetitionTeam]
ADD CONSTRAINT [FK_CompetitionTeam_Competition]
    FOREIGN KEY ([Competition_Id])
    REFERENCES [dbo].[Competitions]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Teams_Id] in table 'CompetitionTeam'
ALTER TABLE [dbo].[CompetitionTeam]
ADD CONSTRAINT [FK_CompetitionTeam_Team]
    FOREIGN KEY ([Teams_Id])
    REFERENCES [dbo].[Teams]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_CompetitionTeam_Team'
CREATE INDEX [IX_FK_CompetitionTeam_Team]
ON [dbo].[CompetitionTeam]
    ([Teams_Id]);
GO

-- Creating foreign key on [Ladder_Id] in table 'Competitions'
ALTER TABLE [dbo].[Competitions]
ADD CONSTRAINT [FK_LadderCompetition]
    FOREIGN KEY ([Ladder_Id])
    REFERENCES [dbo].[Ladders]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_LadderCompetition'
CREATE INDEX [IX_FK_LadderCompetition]
ON [dbo].[Competitions]
    ([Ladder_Id]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------