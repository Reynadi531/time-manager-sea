use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Create tasks table
        manager
            .create_table(
                Table::create()
                    .table(Task::Table)
                    .if_not_exists()
                    .col(pk_auto(Task::Id).auto_increment())
                    .col(string(Task::Title))
                    .col(text_null(Task::Description))
                    .col(string(Task::Status)) // todo, progress, done
                    .col(string_null(Task::Priority))
                    .col(timestamp_with_time_zone_null(Task::DueDate))
                    .col(timestamp_with_time_zone(Task::CreatedAt))
                    .col(timestamp_with_time_zone(Task::UpdatedAt))
                    .to_owned(),
            )
            .await?;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Task::Table).to_owned())
            .await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
enum Task {
    Table,
    Id,
    Title,
    Description,
    Status,
    Priority,
    DueDate,
    CreatedAt,
    UpdatedAt,
}
