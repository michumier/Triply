# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy csproj
COPY ./server/*.csproj ./
RUN dotnet restore

# Copy full backend source
COPY ./server/. ./
RUN dotnet build -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
EXPOSE 5222

COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "server.dll"]
